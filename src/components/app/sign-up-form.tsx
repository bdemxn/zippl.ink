"use client"

import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import GoogleIcon from "@/shared/icons/google-icon"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useAuth, type Login } from "@/shared/hooks/use-auth"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function SignUpForm() {
	const { RegisterSchema, signUp, signInGoogle } = useAuth()
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Login>({
		resolver: zodResolver(RegisterSchema)
	})

	const onSubmit: SubmitHandler<Login> = (data) => toast.promise(signUp(data), {
		loading: "Creating your new user...",
		success: (data) => {
			router.push("/dashboard")
			return `Welcome to Zippl.ink, ${data.user.name}`
		},
		error: (error) => `Oops, an error occurs: ${error.message}`
	})

	return (
		<aside className="lg:border lg:border-neutral-200 md:p-4 rounded md:min-w-[24rem]">
			<form className="flex flex-col gap-y-6" onSubmit={handleSubmit(onSubmit)}>
				<Button type="button" variant="outline" className="w-full" onClick={() => signInGoogle()}>
					<GoogleIcon />
					Continue with Google
				</Button>

				<div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
					<span className="relative z-10 bg-background px-2 text-muted-foreground">
						or
					</span>
				</div>

				<div className="flex-col space-y-1">
					<Label htmlFor="email">Email</Label>
					<Input
						id="email"
						type="email"

						placeholder="kevin@zippl.ink"
						{...register("email")}
					/>
					{errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
				</div>

				<div className="flex-col space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input
						id="name"
						type="text"
						required
						placeholder="Kevin Bonilla"
						{...register("name")}
					/>
					{errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
				</div>

				<div className="flex-col space-y-1">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						type="password"
						required
						{...register("password")}
					/>
					{errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
				</div>

				<Button type="submit">Get started</Button>
			</form>
		</aside>
	)
}
