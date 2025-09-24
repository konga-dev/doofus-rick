import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type React from 'react'
import { auth } from '@/lib/auth'

const GUILD_ID = '691751152034906142'

export default async function RequiresAuth({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await auth.api.getSession({
		headers: await headers(),
	})

	if (!session || !session.user) {
		redirect('/auth/login')
	}

	const token = await auth.api.getAccessToken({
		body: {
			providerId: 'discord',
		},
		headers: await headers(),
	})

	const guilds = (await (
		await fetch('https://discord.com/api/users/@me/guilds', {
			headers: {
				Authorization: `Bearer ${token.accessToken}`,
			},
		})
	).json()) as Array<{ id: string }>

	if (!guilds.some(guild => guild.id === GUILD_ID)) {
		redirect('/auth/forbidden')
	}

	return <> {children} </>
}
