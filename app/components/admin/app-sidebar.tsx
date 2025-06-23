import { LeafIcon, LinkIcon, TrendingUpIcon } from "lucide-react";
import {
	Sidebar,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import {
	DropdownMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { auth } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";

const items = [
	{
		title: "My Links",
		url: "/app",
		icon: LinkIcon,
	},
	{
		title: "Reports",
		url: "/app/reports",
		icon: TrendingUpIcon,
	},
	{
		title: "Billing",
		url: "/app/billing",
		icon: LeafIcon,
	},
];

export function AppSidebar({
	userSession,
}: {
	userSession: typeof auth.$Infer.Session;
}) {
	console.log({ userSession });

	return (
		<Sidebar>
			<SidebarGroup>
				<SidebarGroupLabel>My Dashboard</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem className="mb-2">
							<SidebarMenuButton asChild>
								<Button onClick={() => alert("Create new Link")}>
									Create new Link
								</Button>
							</SidebarMenuButton>
						</SidebarMenuItem>
						{items.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild>
									<a href={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>

			<SidebarFooter className="mt-auto">
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="flex items-center gap-x-2">
									<Avatar>
										<AvatarImage src={userSession.user.image ?? ""} />
										<AvatarFallback>X</AvatarFallback>
									</Avatar>

									<span>{userSession.user.name}</span>
								</SidebarMenuButton>
							</DropdownMenuTrigger>

							<DropdownMenuContent
								side="right"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuItem>
									<span>Account</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={async () => await authClient.signOut()}
								>
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
