import { defineConfig } from "drizzle-kit"
import { config } from "@/shared/config/env"

const { DATABASE_URL } = config

export default defineConfig({
	dialect: "postgresql",
	out: "./src/infraestructre/database/migrations",
	schema: "./src/shared/schemas/index.ts",

	dbCredentials: {
		url: DATABASE_URL,
	},
})
