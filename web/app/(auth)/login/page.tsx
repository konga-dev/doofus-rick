import Link from 'next/link'
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card'
import {cn} from '@/lib/utils'
import SignInButton from "@/components/SignInButton";
import {checkAccess} from "@/lib/auth-client";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";
import ForceReload from "@/components/ForceReload";

export const dynamic = 'force-dynamic'

export default async function SignIn() {
    await cookies()
    const access = await checkAccess(await headers())

    if (access.isSignedIn && access.hasAccess) {
        redirect('/')
    }

    return (
        <>
            <ForceReload/>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex flex-row items-center gap-2 mt-4">
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
                    <CardTitle className="mt-4 text-lg md:text-xl">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-xs md:text-sm">
                        Use your Discord account to login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div
                            className={cn(
                                'w-full gap-2 flex items-center',
                                'justify-between flex-col',
                            )}
                        >
                            <SignInButton/>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className="flex justify-center w-full border-t py-4">
                        <p className="text-center text-xs text-neutral-500">
                            built by{' '}
                            <Link
                                href="https://konga.dev"
                                className="underline"
                                target="_blank"
                            >
							<span className="dark:text-white/70 cursor-pointer">
								konga.
							</span>
                            </Link>
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}
