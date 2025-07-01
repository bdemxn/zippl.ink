import { authClient } from "~/lib/auth-client";
import { db } from "~/lib/db";
import { links } from "~/schemas";
import type { LinkInput } from "~/types/link-types";

export class LinkServices {
	async createNewLink(linkInput: LinkInput) {
		try {
			const { data } = await authClient.getSession();
			if (!data) throw Error();

			const userId: string = data.user.id;

			await db.insert(links).values({
				originalUrl: linkInput.originalUrl,
				domain: linkInput.domain,
				shortenCode: linkInput.shortenCode,
				tags: linkInput.tags,
				description: linkInput.description,
				userId,
			});
		} catch (err) {
			console.error({ err });
			throw Error;
		}
	}
}