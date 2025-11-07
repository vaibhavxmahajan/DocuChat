import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

export default {
  schema: "./db/schema", // <-- adjust if your schema folder path differs
  out: "./drizzle", // migrations folder output
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // ensure env is loaded
  },
} satisfies Config;
