import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { eq, SQLWrapper } from "drizzle-orm";
import { userProgress, courses, units, lessons, challenges, challengeProgress } from "./schema";


export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
});

export const getUserProgress = cache(async () => {
    const { userId } = auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

export const getUnits = cache(async () => {
    const progress = await getUserProgress();
    const {userId} = await auth();
    
    if (!userId || !progress?.activeCourseId) {
        return [];
    }

    const unitsData = await db.query.units.findMany({
        where: eq(units.courseId, progress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (challenges, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, progress.userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const normalizedData = unitsData.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress &&
                    challenge.challengeProgress.length > 0 &&
                    challenge.challengeProgress.every((progress) => progress.completed);
            });
            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});

export const getCourseById = cache(async (courseId: number | SQLWrapper) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                    },
                },
            },
        },
    });

    return data;
});
