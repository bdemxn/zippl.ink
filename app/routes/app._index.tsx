import { useLoaderData, type LoaderFunctionArgs } from "react-router";
import { CreateLinkBtn } from "~/components/admin/create-link-btn";
import { LinkCard } from "~/components/admin/link-card";
import { Input } from "~/components/ui/input";
import { auth } from "~/lib/auth";
import { db } from "~/lib/db";
import { computed } from "@preact/signals-react";
import React from "react";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await auth.api.getSession({ headers: request.headers });

	if (!session) {
		return Response.json({ error: "Unauthorized" }, { status: 403 });
	}

	const userLinks = await db.query.links.findMany({
		where: (l, { eq }) => eq(l.userId, session.user.id),
		orderBy: (l, { desc }) => [desc(l.createdAt)],
	});

	return userLinks;
}

export default function AppHomePage() {
	const userLinks = useLoaderData<typeof loader>();
	const [searchQuery, setSearchQuery] = React.useState<string>("");

	const filteredUserLinks = computed(() =>
		userLinks.filter((item) => {
			const query = searchQuery.toLowerCase();
			return (
				item.tags?.toLowerCase().includes(query) ||
				item.description?.toLowerCase().includes(query) ||
				item.originalUrl.toLowerCase().includes(query)
			);
		}),
	);

	return (
		<div className="">
			<h3 className="text-xl font-semibold">My Links</h3>
			<hr className="my-2" />

			<div className="flex gap-x-2">
				<CreateLinkBtn />
				<Input
					className="max-w-xl"
					placeholder="Search link by tag, description or url..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>

			<section className="grid grid-cols-3 gap-x-2 gap-y-2 mt-5">
				{filteredUserLinks.value.map((link) => (
					<LinkCard
						key={link.id}
						id={link.id}
						tags={link.tags}
						domain={link.domain}
						originalUrl={link.originalUrl}
						shortenCode={link.shortenCode}
						createdAt={link.createdAt ?? new Date()}
						description={link.description ?? ""}
					/>
				))}
			</section>
		</div>
	);
}
