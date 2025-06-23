import { CreateLinkBtn } from "~/components/admin/create-link-btn";

export default function AppHomePage() {
	return (
		<div className="">
			<h3 className="text-xl font-semibold">My Links</h3>
			<CreateLinkBtn />
		</div>
	);
}
