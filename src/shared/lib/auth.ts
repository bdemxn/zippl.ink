import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "../config/db"
import { config } from "../config/env"

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = config

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	appName: "Zippl.ink",
})
