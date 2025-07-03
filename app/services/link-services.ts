import type { LinkInput } from "~/types/link-types";

export class LinkServices {
	async createNewLink(values: LinkInput) {
		const response = await fetch("/api/links", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(values),
		});

		if (!response.ok) throw new Error("Something went wrong");
		return await response.json();
	}

	async deleteLinkById(id?: string) {
		const response = await fetch(`/api/links/${id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) throw new Error("Something went wrong");
		return await response.json();
	}
}
