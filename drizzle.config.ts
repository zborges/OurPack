import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle",         // Folder for migration files
  dialect: "postgresql",    // "postgresql", "mysql", or "sqlite"
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
