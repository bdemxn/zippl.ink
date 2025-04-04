"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { GeistMono } from "geist/font/mono"

export function Navbar() {
	const router = useRouter()

	return (
		<nav className="border-b border-neutral-200 w-full">
			<section className="p-2 flex justify-between items-center">
				<section className={GeistMono.className}>
					<p className="font-bold">Zippl.ink</p>
				</section>

				<section>
					<Button variant="ghost" onClick={() => router.push("/sign-up")}>
						Sign up
					</Button>
				</section>
			</section>
		</nav>
	)
}
