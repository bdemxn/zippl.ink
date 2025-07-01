import { PackagePlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkInput } from "~/types/link-types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { LinkServices } from "~/services/link-services";

export function CreateLinkBtn({ className }: React.ComponentProps<"button">) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className={className}>
					<PackagePlusIcon />
					Create a link
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create your new trackable shorten link</DialogTitle>
					<DialogDescription>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo,
						inventore?
					</DialogDescription>
				</DialogHeader>

				<CreateLinkForm />
			</DialogContent>
		</Dialog>
	);
}

function CreateLinkForm() {
	const {
		register,
		handleSubmit,
		control,
		setValue,
		formState: { errors },
	} = useForm<LinkInput>({
		resolver: zodResolver(linkSchema),
		defaultValues: {
			shortenCode: nanoid(6),
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	const linkServices = new LinkServices();

	function linkSubmit(values: LinkInput) {
		toast.promise(async () => await linkServices.createNewLink(values), {
			loading: "Creating new awesome link...",
			success: "New link has been created 🚀",
			error: (error) => `Oops: ${error.message}`,
		});
	}

	return (
		<form onSubmit={handleSubmit(linkSubmit)} className="flex flex-col gap-y-2">
			<div className="space-y-1">
				<Label htmlFor="url">Original URL</Label>
				<Input
					placeholder="https://www.yourweb.com"
					{...register("originalUrl")}
				/>
				{errors.originalUrl && (
					<span className="text-xs text-red-500">
						{errors.originalUrl.message}
					</span>
				)}
			</div>

			<div className="flex gap-x-2 items-end">
				<div>
					<Label className="mb-1">Domain</Label>
					<Controller
						control={control}
						name="domain"
						render={({ field }) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className="min-w-[10rem]">
									<SelectValue placeholder="Pick a domain" />
								</SelectTrigger>

								<SelectContent>
									<SelectItem value="zippl.ink">zippl.ink</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
				</div>

				<div className="space-y-1">
					<Label htmlFor="shorten">Shorten Code</Label>
					<Input placeholder="my-code" {...register("shortenCode")} />
				</div>

				<Button
					className="space-y-1"
					type="button"
					onClick={() => setValue("shortenCode", nanoid(6))}
				>
					Shuffle
				</Button>
			</div>

			{errors.shortenCode && (
				<span className="text-xs text-red-500">
					{errors.shortenCode.message}
				</span>
			)}

			<Button type="submit">Create & Track</Button>
		</form>
	);
}
