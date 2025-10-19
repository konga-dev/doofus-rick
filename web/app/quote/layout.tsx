import type React from 'react'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import Navigation from '@/components/ui/navigation/navigation'
import {NavigationProvider} from '@/components/ui/navigation/navigation-context'
import RequiresAuth from "@/components/ui/auth/requires-auth";

export const dynamic = 'force-dynamic'

export default function QuoteLayout({
                                        children,
                                    }: {
    children: React.ReactNode
}) {
    return (
        <RequiresAuth>
            <div className="flex flex-row items-center justify-center gap-2 mt-4 ml-4">
                <Avatar className="h-24 w-24 rounded-full mr-2">
                    <AvatarImage src="/doofus-rick.png" alt="CN"/>
                    <AvatarFallback/>
                </Avatar>
                <div className="flex flex-col">
                    <div className="text-2xl font-bold">doofus rick</div>
                    <div className="italic">
                        cause it can't get any worse than this
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-4 w-[600px]">
                <NavigationProvider>
                    <Navigation/>
                    {children}
                </NavigationProvider>
            </div>
        </RequiresAuth>
    )
}
