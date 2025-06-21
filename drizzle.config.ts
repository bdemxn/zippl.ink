import { defineConfig } from "drizzle-kit";
import { env } from "~/lib/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/schemas/index.ts",
  out: "./drizzle",

  dbCredentials: {
    url: env.DATABASE_URL
  },

  migrations: {
    prefix: "timestamp",
    table: "__drizzle_migrations__",
    schema: "public",
  },
})