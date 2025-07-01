import type { LinkInput } from "~/types/link-types";

export class LinkServices {
	async createNewLink(values: LinkInput) {
		const response = await fetch("/api/links/create", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});

		if (!response.ok) throw new Error("Something went wrong");
		return await response.json();
	}
}
