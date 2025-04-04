"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { GeistMono } from "geist/font/mono"

export function AppNavbar() {
	return (
		<nav className="border-b border-neutral-200 w-full">
			<section className="p-2 flex justify-between items-center">
				<section className={GeistMono.className}>
					<p className="font-bold">Zippl.ink</p>
				</section>

				<ButtonsSection />
			</section>
		</nav>
	)
}

function ButtonsSection() {
	const router = useRouter()
	const path = usePathname()

	return (
		<section>
			{path === "/sign-up" ? (
				<Button variant="ghost" onClick={() => router.push("/sign-in")}>
					Sign in
				</Button>
			) : (
				<Button variant="ghost" onClick={() => router.push("/sign-up")}>
					Sign up
				</Button>
			)}
		</section>
	)
}
