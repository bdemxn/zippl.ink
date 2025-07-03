import type { LinkResponse } from "~/types/link-types";

export function LinkCard(link: Partial<LinkResponse>) {
	console.log({ link });

	function tagStringToList(tag?: string | null): string[] {
		return tag != null ? tag.split(", ") : ["No tags"];
	}

	const tagList = tagStringToList(link.tags);

	return (
		<div className="border border-neutral-200 p-2 rounded flex flex-col">
			<h6 className="text-xs font-semibold text-black/50">
				{link.domain}/{link.shortenCode}
			</h6>
			<a className="hover:text-blue-500 transition-all" href={link.originalUrl}>
				Original URL: {link.originalUrl}
			</a>
			<p>{link.description}</p>

			<div className="mt-1">
				{tagList.map((tag) => (
					<span
						className="text-xs rounded p-1 border mr-1 cursor-cell hover:bg-blue-50 hover:text-blue-700 transition hover:border-blue-500"
						key={tag}
					>
						{tag}
					</span>
				))}
				<p className="w-full text-right">
					{link.createdAt?.toLocaleDateString()}
				</p>
			</div>
		</div>
	);
}
