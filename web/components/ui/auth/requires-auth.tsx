import { redirect } from 'next/navigation'
import type React from 'react'
import {cookies, headers} from "next/headers";
import { getAccessToken, getSession } from "@/lib/auth-client";

const GUILD_ID = '691751152034906142'

export default async function RequiresAuth({
	children,
}: {
	children: React.ReactNode
}) {
    const headerz = await headers()

    const { data } = await getSession({
        fetchOptions: {
            headers: headerz,
        },
    });

	if (!data || !data.user) {
		redirect("/login");
	}

	const tokenData = await getAccessToken({
        providerId: 'discord',
        fetchOptions: {
            headers: headerz,
        },
    })

	if (!tokenData?.data?.accessToken) {
		redirect("/login");
	}

	const guilds = (await (
		await fetch("https://discord.com/api/users/@me/guilds", {
			headers: {
				Authorization: `Bearer ${tokenData.data.accessToken}`,
			},
		})
	).json()) as Array<{ id: string }>;

	if (!guilds.some((guild) => guild.id === GUILD_ID)) {
		redirect("/forbidden");
	}

	return <>{children}</>;
}
