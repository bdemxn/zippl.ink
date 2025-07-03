import type { ActionFunctionArgs } from "react-router";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { links } from "~/schemas";
import { linkSchema } from "~/types/link-types";

export async function action({ request }: ActionFunctionArgs) {
	if (request.method === "POST") {
		const data = await request.json();
		const result = linkSchema.safeParse(data);

		if (!result.success) {
			return Response.json(
				{ errors: result.error.flatten().fieldErrors },
				{ status: 499 },
			);
		}

		const session = await auth.api.getSession({ headers: request.headers });
		if (!session) {
			return Response.json({ error: "Unautharized" }, { status: 403 });
		}

		const userId: string = session.user.id;
		const values = result.data;

		await db.insert(links).values({
			...values,
			userId,
		});

		return Response.json({ success: true });
	}
}
