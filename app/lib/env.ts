export const env = {
	DATABASE_URL: process.env.DATABASE_URL as string,
	UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL as string,
	UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN as string,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
	GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
	GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
};
