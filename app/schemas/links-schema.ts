import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const links = pgTable("links", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	domain: text("domain").notNull(),
	originalUrl: text("original_url").notNull(),
	shortenCode: text("shorten_code").notNull(),
	description: text("description"),
	tags: text("tags"),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});

export const clicks = pgTable("clicks", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	linkId: uuid("link_id")
		.notNull()
		.references(() => links.id, { onDelete: "cascade" }),
	userAgent: text("user_agent").notNull(),
	referrer: text("referrer").notNull(),
	createdAt: timestamp("created_at").defaultNow(),
});
