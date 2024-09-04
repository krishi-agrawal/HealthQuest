import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql", // Specify the database dialect
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle", // Output directory for migration files
  dbCredentials: {
    url: process.env.DATABASE_URL!, // Use 'url' instead of 'connectionString'
  },
});
