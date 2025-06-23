import { signal } from "@preact/signals-react";
import type { auth } from "~/lib/auth";

type UserStore = {
	user: typeof auth.$Infer.Session.user | null;
};

export const userStore = signal<UserStore>({
	user: null,
});
