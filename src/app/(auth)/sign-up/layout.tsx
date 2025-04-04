import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Welcome to Zippl.ink",
}

export default function SignUpLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <main>{children}</main>
}
