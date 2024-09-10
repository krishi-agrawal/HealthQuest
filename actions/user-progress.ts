"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { getCourseById, getUserProgress } from "@/db/queries";
import { courses, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import db from "@/db/drizzle";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  const course = await getCourseById(courseId);

  if (!course) throw new Error("Course not found.");

  // Check if user progress exists for this userId
  const existingUserProgress = await getUserProgress(); // Pass userId to check specific user's progress

  if (existingUserProgress) {
    console.log("Updating existing user progress");

    // Update the existing record
    await db
      .update(userProgress)
      .set({
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      })
      .where(userProgress.userId.eq(userId)); // Ensure you update only for this specific user

    console.log("Re-routing after update");
    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
    return;
  }

  console.log("Inserting new user progress");

  // Insert a new record if no existing progress found
  await db.insert(userProgress).values({
    userId,
    activeCourseId: courseId,
    userName: user.firstName || "User",
    userImageSrc: user.imageUrl || "/mascot.svg",
  });

  revalidatePath("/courses");
  revalidatePath("/learn");
  redirect("/learn");
};



// .where(userProgress.userId.eq(userId))