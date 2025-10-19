import {redirect} from 'next/navigation'
import type React from 'react'
import {headers} from "next/headers";
import {checkAccess} from "@/lib/auth-client";

export default async function RequiresAuth({
                                               children,
                                           }: {
    children: React.ReactNode
}) {
    const access = await checkAccess(await headers())

    if (!access.isSignedIn) {
        redirect("/login");
    }

    if (!access.hasAccess) {
        redirect("/forbidden");
    }

    return <>{children}</>;
}
