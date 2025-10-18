import { createAuthClient } from 'better-auth/react'

export const { signIn, useSession, signOut, getSession, getAccessToken } = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_BACKEND,
	fetchOptions: {
		credentials: 'include'
	}
})