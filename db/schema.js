"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProgressRelations = exports.userProgress = exports.challengeProgressRelations = exports.challengeProgress = exports.challengeOptionsRelations = exports.challengeOptions = exports.challengesRelations = exports.challenges = exports.challengesEnum = exports.lessonsRelations = exports.lessons = exports.unitsRelations = exports.units = exports.coursesRelations = exports.courses = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_orm_1 = require("drizzle-orm");
exports.courses = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    imageSrc: (0, pg_core_1.text)("image_src").notNull(),
});
exports.coursesRelations = (0, drizzle_orm_1.relations)(exports.courses, function (_a) {
    var many = _a.many;
    return ({
        userProgress: many(exports.userProgress),
        units: many(exports.units),
    });
});
exports.units = (0, pg_core_1.pgTable)("units", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    courseId: (0, pg_core_1.integer)("course_id").references(function () { return exports.courses.id; }, { onDelete: "cascade" }).notNull(),
    order: (0, pg_core_1.integer)("order").notNull()
});
exports.unitsRelations = (0, drizzle_orm_1.relations)(exports.units, function (_a) {
    var many = _a.many, one = _a.one;
    return ({
        course: one(exports.courses, {
            fields: [exports.units.courseId],
            references: [exports.courses.id]
        }),
        lessons: many(exports.lessons),
    });
});
exports.lessons = (0, pg_core_1.pgTable)("lessons", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    unitId: (0, pg_core_1.integer)("unit_id").references(function () { return exports.units.id; }, { onDelete: 'cascade' }).notNull(),
    order: (0, pg_core_1.integer)("order").notNull()
});
exports.lessonsRelations = (0, drizzle_orm_1.relations)(exports.lessons, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        unit: one(exports.units, {
            fields: [exports.lessons.unitId],
            references: [exports.units.id]
        })
    });
});
exports.challengesEnum = (0, pg_core_1.pgEnum)("type", ["SELECT", "ASSIST"]);
exports.challenges = (0, pg_core_1.pgTable)("challenges", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    lessonId: (0, pg_core_1.integer)("lesson_id").references(function () { return exports.lessons.id; }, { onDelete: "cascade" }).notNull(),
    type: (0, exports.challengesEnum)("type").notNull(),
    question: (0, pg_core_1.text)("question").notNull(),
    order: (0, pg_core_1.integer)("order").notNull(),
});
exports.challengesRelations = (0, drizzle_orm_1.relations)(exports.challenges, function (_a) {
    var one = _a.one, many = _a.many;
    return ({
        lesson: one(exports.lessons, {
            fields: [exports.challenges.lessonId],
            references: [exports.lessons.id]
        }),
        challengeOptions: many(exports.challengeOptions),
        challengeProgress: many(exports.challengeProgress)
    });
});
exports.challengeOptions = (0, pg_core_1.pgTable)("challenge_option", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    challengeId: (0, pg_core_1.integer)("challenge_id").references(function () { return exports.challenges.id; }, { onDelete: "cascade" }).notNull(),
    text: (0, pg_core_1.text)("text").notNull(),
    correct: (0, pg_core_1.boolean)("correct").notNull(),
    imageSrc: (0, pg_core_1.text)("image_src"),
    audioSrc: (0, pg_core_1.text)("audio_src")
});
exports.challengeOptionsRelations = (0, drizzle_orm_1.relations)(exports.challengeOptions, function (_a) {
    var one = _a.one;
    return ({
        challenge: one(exports.challenges, {
            fields: [exports.challengeOptions.challengeId],
            references: [exports.challenges.id]
        })
    });
});
exports.challengeProgress = (0, pg_core_1.pgTable)("challenge_progress", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id").notNull(),
    challengeId: (0, pg_core_1.integer)("challenge_id").references(function () { return exports.challenges.id; }, {
        onDelete: "cascade"
    }).notNull(),
    completed: (0, pg_core_1.boolean)("completed").notNull().default(false)
});
exports.challengeProgressRelations = (0, drizzle_orm_1.relations)(exports.challengeProgress, function (_a) {
    var one = _a.one;
    return ({
        challenge: one(exports.challenges, {
            fields: [exports.challengeProgress.challengeId],
            references: [exports.challenges.id]
        })
    });
});
exports.userProgress = (0, pg_core_1.pgTable)("user_progress", {
    userId: (0, pg_core_1.text)("user_id").primaryKey(),
    userName: (0, pg_core_1.text)("user_name").notNull().default("User"),
    userImageSrc: (0, pg_core_1.text)("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: (0, pg_core_1.integer)("active_course_id").references(function () { return exports.courses.id; }, {
        onDelete: "cascade",
    }),
    hearts: (0, pg_core_1.integer)("hearts").notNull().default(5),
    points: (0, pg_core_1.integer)("points").notNull().default(0),
});
exports.userProgressRelations = (0, drizzle_orm_1.relations)(exports.userProgress, function (_a) {
    var one = _a.one;
    return ({
        activeCourse: one(exports.courses, {
            fields: [exports.userProgress.activeCourseId],
            references: [exports.courses.id],
        }),
    });
});
