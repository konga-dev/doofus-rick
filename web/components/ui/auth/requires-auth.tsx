import { redirect } from 'next/navigation'
import type React from 'react'
import { cookies } from "next/headers";
import { getAccessToken, getSession } from "@/lib/auth-client";

const GUILD_ID = '691751152034906142'

export default async function RequiresAuth({
	children,
}: {
	children: React.ReactNode
}) {
	const x = await cookies()
	x.getAll().forEach(a => console.log(a))


	const { data } = await getSession();

	if (!data || !data.user) {
		redirect("/auth/login");
	}

	const tokenData = await getAccessToken({ providerId: 'discord' })

	if (!tokenData?.data?.accessToken) {
		redirect("/auth/login");
	}

	const guilds = (await (
		await fetch("https://discord.com/api/users/@me/guilds", {
			headers: {
				Authorization: `Bearer ${tokenData.data.accessToken}`,
			},
		})
	).json()) as Array<{ id: string }>;

	if (!guilds.some((guild) => guild.id === GUILD_ID)) {
		redirect("/auth/forbidden");
	}

	return <>{children}</>;
}
