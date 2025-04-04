import { AppNavbar } from "@/components/app/app-navbar"
import { SignUpForm } from "@/components/app/sign-up-form"

export default function SignUp() {
	return (
		<section>
			<AppNavbar />

			<section className="grid grid-cols-2 lg:flex lg:justify-center items-center mt-10 gap-x-[10rem] px-6">
				<h3 className="">
					Manage your traffic without <span>stress</span>
				</h3>
				<SignUpForm />
			</section>
		</section>
	)
}
