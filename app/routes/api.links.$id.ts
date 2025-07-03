import { eq } from "drizzle-orm";
import type { ActionFunctionArgs } from "react-router";
import { db } from "~/lib/db";
import { links } from "~/schemas";

export async function action({ params, request }: ActionFunctionArgs) {
	if (request.method === "DELETE") {
		const linkId = params.id;

		if (!linkId) {
			return Response.json({ error: "Link id is invalid" }, { status: 500 });
		}

		const link = await db.query.links.findFirst({
			where: (l, { eq }) => eq(l.id, linkId),
		});

		if (!link) {
			return Response.json({ error: "Link doesn't found" }, { status: 404 });
		}

		await db.delete(links).where(eq(links.id, linkId));

		return { success: true };
	}

	if (request.method === "PATCH") {
		return Response.json(
			{ error: "Function not implemented yet" },
			{ status: 500 },
		);
	}
}
