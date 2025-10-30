import { createAuthClient } from 'better-auth/react'
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { auth } from './auth'

export const authClient = createAuthClient({
	baseURL: process.env.BETTER_AUTH_URL,
})

export const checkAccess: (
	headers: ReadonlyHeaders,
) => Promise<{ isSignedIn: boolean; hasAccess: boolean }> = async (
	headers: ReadonlyHeaders,
) => {
		const { data } = await authClient.getSession({
			fetchOptions: {
				headers,
			},
		})

		if (!data || !data.user) {
			return { isSignedIn: false, hasAccess: false }
		}

		const { accessToken } = await auth.api.getAccessToken({
			body: {
				providerId: 'discord',
			},
			headers,
		})

		if (!accessToken) {
			return { isSignedIn: false, hasAccess: false }
		}

		const response = await fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		const guilds = await response.json()

		const isGuildMember =
			Array.isArray(guilds) &&
			guilds.some(guild => guild?.id === process.env.DISCORD_GUILD_ID)

		return { isSignedIn: true, hasAccess: isGuildMember }
	}
