"use client"

import { z, type ZodType } from "zod"
import { IS_DEV } from "../config/env"
import { authClient } from "../lib/auth-client"

export interface Login {
	name: string
	email: string
	password: string
	image?: string
}

export function useAuth() {
	async function signUp(props: Login) {
		const { data: user, error } = await authClient.signUp.email({
			email: props.email,
			password: props.password,
			name: props.name,
		})

		if (error) {
			if (IS_DEV) console.error(error.message, error.status)
			throw error
		}

		return user
	}

	async function signIn(props: Omit<Login, "name">) {
		const { data: user, error } = await authClient.signIn.email({
			email: props.email,
			password: props.password,
		})

		if (error) {
			if (IS_DEV) console.error(error.message, error.status)
			throw error
		}

		return user
	}

	async function signOut() {
		const { data, error } = await authClient.signOut()

		if (error) {
			if (IS_DEV) console.error(error.message, error.status)
			throw error
		}

		return data
	}

	async function signInGoogle() {
		const { data, error } = await authClient.signIn.social({
			provider: "google",
		})

		if (error) {
			if (IS_DEV) console.error(error.message, error.status)
			throw error
		}

		return data
	}

	async function sessionAuth() {
		const { data: session, error } = await authClient.getSession()

		if (error) {
			if (IS_DEV) console.error(error.message, error.status)
			throw error
		}

		return session
	}

	const LoginSchema: ZodType<Omit<Login, "name">> = z.object({
		email: z.string().email(),
		password: z.string().min(8, { message: "Password is too short" }),
	})

	const RegisterSchema: ZodType<Login> = z.object({
		email: z.string().email(),
		password: z.string().min(8, { message: "Password is too short" }),
		name: z.string().min(3),
	})

	return {
		signUp,
		signIn,
		signOut,
		signInGoogle,
		sessionAuth,
		LoginSchema,
		RegisterSchema,
	}
}
