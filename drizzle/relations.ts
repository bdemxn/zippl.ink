import { relations } from "drizzle-orm/relations";
import { user, account, session, clicks, links, subscriptions } from "./schema";

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	accounts: many(account),
	sessions: many(session),
	clicks: many(clicks),
	links: many(links),
	subscriptions: many(subscriptions),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const clicksRelations = relations(clicks, ({one}) => ({
	user: one(user, {
		fields: [clicks.userId],
		references: [user.id]
	}),
	link: one(links, {
		fields: [clicks.linkId],
		references: [links.id]
	}),
}));

export const linksRelations = relations(links, ({one, many}) => ({
	clicks: many(clicks),
	user: one(user, {
		fields: [links.userId],
		references: [user.id]
	}),
}));

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	user: one(user, {
		fields: [subscriptions.userId],
		references: [user.id]
	}),
}));