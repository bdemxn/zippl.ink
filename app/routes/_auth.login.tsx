import { Button } from "~/components/ui/button";
import { authClient } from "~/lib/auth-client";

export default function LoginPage() {
	return (
		<div className="flex gap-x-2 p-3">
			<Button
				onClick={async () => {
					const { error } = await authClient.signIn.social({
						provider: "google",
					});
					console.log({ error });
				}}
			>
				Login with Google
			</Button>

			<Button
				onClick={async () => {
					const { error } = await authClient.signIn.social({
						provider: "github",
					});
					console.log({ error });
				}}
			>
				Login with Github
			</Button>
		</div>
	);
}
