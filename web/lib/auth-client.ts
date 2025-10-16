import { createAuthClient } from 'better-auth/react'

export const { signIn, useSession, signOut, getSession, getAccessToken } = createAuthClient({
	baseURL: 'http://localhost:3000/', //process.env.SERVER_URL as string,
	fetchOptions: {
		credentials: 'include'
	}
})