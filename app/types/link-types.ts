import { z } from "zod";

export const linkSchema = z.object({
	domain: z.string().min(1, "Please choose one available domain"),
	originalUrl: z.string().url(),
	shortenCode: z.string().min(1, "Code must be 1 character at least"),
	description: z.string().optional().nullable(),
	tags: z.string().optional().nullable(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
});

export type LinkInput = z.infer<typeof linkSchema>;

export type LinkResponse = LinkInput & {
	id: string;
	userId: string;
};
