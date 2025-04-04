export const IS_DEV = Boolean(process.env.NODE_ENV === "development")

export const config = {
	DATABASE_URL: process.env.DATABASE_URL as string,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
}
