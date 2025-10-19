import {createAuthClient} from 'better-auth/react'
import {ReadonlyHeaders} from "next/dist/server/web/spec-extension/adapters/headers";

const GUILD_ID = '691751152034906142'

export const {signIn, useSession, signOut, getSession, getAccessToken} = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BACKEND,
    fetchOptions: {
        credentials: 'include'
    }
})

interface AccessResult {
    isSignedIn: boolean;
    hasAccess: boolean;
}

export const checkAccess = async (headers: ReadonlyHeaders) => {
    const {data} = await getSession({
        fetchOptions: {
            headers
        },
    });

    if (!data || !data.user) {
        return {isSignedIn: false, hasAccess: false};
    }

    const tokenData = await getAccessToken({
        providerId: 'discord',
        fetchOptions: {
            headers
        },
    })

    if (!tokenData?.data?.accessToken) {
        return {isSignedIn: false, hasAccess: false};
    }

    const guilds = (await (
        await fetch("https://discord.com/api/users/@me/guilds", {
            headers: {
                Authorization: `Bearer ${tokenData.data.accessToken}`,
            },
        })
    ).json()) as Array<{ id: string }>;

    if (!guilds.some((guild) => guild.id === GUILD_ID)) {
        return {isSignedIn: true, hasAccess: false};
    }

    return {isSignedIn: true, hasAccess: true};
}