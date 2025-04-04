import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { config } from "./env"
import * as schema from "@/shared/schemas"

const { DATABASE_URL } = config

const client = new Pool({
	connectionString: DATABASE_URL,
})
export const db = drizzle({ client, schema })
