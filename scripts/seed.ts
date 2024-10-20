import "dotenv/config"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

import * as schema from '../db/schema'

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql,{schema});
const main = async () => {
  try{
    console.log("Seeding database");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units)
    await db.delete(schema.lessons)
    await db.delete(schema.challenges)
    await db.delete(schema.challengeOptions)
    await db.delete(schema.challengeProgress)

    await db.insert(schema.courses).values([
      {
        id:1,
        title:"Mental Health",
        imageSrc:"/mentalHealth.svg"     
      }
    ])

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Understanding Mental Health",
        order: 1
      }
    ])

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: "What is Mental Health?",
        order: 1
      },
      {
        id: 2,
        unitId: 1,
        title: "Mental Health vs. Mental Illness",
        order: 2
      },
    ])

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "Mental health refers to:"
      }
    ])
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        correct: true,
        text: "Emotional, psychological, and social well-being",
        imageSrc: "",
        audioSrc: ""
      }
    ])
    await db.insert(schema.challengeOptions).values([
      {
        id: 2,
        challengeId: 1,
        correct: false,
        text: "Physical well-being",
        imageSrc: "",
        audioSrc: ""
      }
    ])
    await db.insert(schema.challengeOptions).values([
      {
        id: 3,
        challengeId: 1,
        correct: false,
        text: "Only psychological well-being",
        imageSrc: "",
        audioSrc: ""
      }
    ])

  console.log("Seeding finished");
  }catch(error){
    console.log(error);
    throw new Error("Failed to seed the database");
  }
}

main();