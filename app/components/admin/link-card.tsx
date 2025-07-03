import type { LinkResponse } from "~/types/link-types";
import { TrashIcon } from "lucide-react";
import { LinkServices } from "~/services/link-services";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { useRevalidator } from "react-router";
import { Button } from "../ui/button";

export function LinkCard(link: Partial<LinkResponse>) {
	function tagStringToList(tag?: string | null): string[] {
		return tag != null ? tag.split(", ") : ["No tags"];
	}

	const tagList = tagStringToList(link.tags);

	return (
		<div className="border border-neutral-200 p-2 rounded flex flex-col">
			<div className="flex items-center justify-between">
				<h6 className="text-xs font-semibold text-black/50">
					{link.domain}/{link.shortenCode}
				</h6>

				<DeleteDialog id={link.id?.toString()} />
			</div>
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

function DeleteDialog({ id }: { id?: string }) {
	const linkServices = new LinkServices();
	const revalidator = useRevalidator();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="ghost" size="sm">
					<TrashIcon />
				</Button>
			</AlertDialogTrigger>

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure to delete this link?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					This action cannot be undone. This will permanently delete your
					account and remove your data from our servers.
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							toast.promise(async () => await linkServices.deleteLinkById(id), {
								loading: "Deleting link...",
								success: () => {
									revalidator.revalidate();
									return "Selected link has been deleted";
								},
								error: (error) => `Error: ${error.message}`,
							});
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
