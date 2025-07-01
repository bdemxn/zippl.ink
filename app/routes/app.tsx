import {
	Outlet,
	redirect,
	useLoaderData,
	type LoaderFunctionArgs,
} from "react-router";
import { AppSidebar } from "~/components/admin/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { auth } from "~/lib/auth";

export async function loader({ request }: LoaderFunctionArgs) {
	const session = await auth.api.getSession({
		headers: request.headers,
	});

	if (!session) return redirect("/login");
	return session;
}

export default function AppLayout() {
	const session = useLoaderData<typeof loader>();

	return (
		<SidebarProvider>
			<AppSidebar userSession={session} />
			<main className="w-full">
				<SidebarTrigger />
				<section className="p-3">
					<Outlet />
				</section>
			</main>
		</SidebarProvider>
	);
}
