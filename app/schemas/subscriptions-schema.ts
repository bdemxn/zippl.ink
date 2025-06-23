import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const subscriptions = pgTable("subscriptions", {
	id: uuid("id").notNull().defaultRandom(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	plan: text("plan").notNull().default("free"),
	startedAt: timestamp("started_at")
		.notNull()
		.$defaultFn(() => new Date()),
});
