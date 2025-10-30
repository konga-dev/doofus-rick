'use client'

import { FilePlus, PencilLine, LogOut } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigation } from '@/components/ui/navigation/navigation-context'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '../navigation-menu'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../dropdown-menu'
import { authClient } from '@/lib/auth-client'

export default function Navigation() {
	const { extraItems } = useNavigation()
	const { data: session } = authClient.useSession()

	const handleLogout = async () => {
		await authClient.signOut()
		window.location.href = '/login'
	}

	return (
		<div className="flex justify-between items-center mt-4 ml-4 mr-4 mb-8">
			<NavigationMenu viewport={false}>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Home</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
								<li className="row-span-3">
									<NavigationMenuLink asChild>
										<a
											className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
											href="/quote"
										>
											<div className="flex flex-row items-center gap-2 mt-4 mb-2">
												<Avatar>
													<AvatarImage
														src="/doofus-rick.png"
														alt="CN"
													/>
													<AvatarFallback />
												</Avatar>
												<div className="text-lg font-medium">
													doofus rick
												</div>
											</div>
											<p className="text-muted-foreground text-sm leading-tight">
												The full-fledged Doofus Rick
												experience. Shows all quotes.
											</p>
										</a>
									</NavigationMenuLink>
								</li>
								<ListItem
									href="/quote/random"
									title="Random quote"
								>
									A random quote that brightens your day.
								</ListItem>
								<ListItem
									href="/quote/cakeday"
									title="Cakeday quotes"
								>
									All quotes that celebrate their cakeday
									today.
								</ListItem>
								<ListItem
									href="/quote/self"
									title="Your quotes"
								>
									All the hilarious moments you've managed to
									capture.
								</ListItem>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Editor</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className="grid w-[200px] gap-4">
								<li>
									<NavigationMenuLink asChild>
										<Link
											href="#"
											className="flex-row items-center gap-2"
										>
											<FilePlus />
											Create
										</Link>
									</NavigationMenuLink>
									<NavigationMenuLink asChild>
										<Link
											href="#"
											className="flex-row items-center gap-2"
										>
											<PencilLine />
											Edit
										</Link>
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<div className="flex items-center gap-2">
				{extraItems}
				{session?.user && (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								type="button"
								className="cursor-pointer outline-hidden rounded-full"
							>
								<Avatar>
									<AvatarImage
										src={session.user.image || undefined}
										alt={session.user.name || 'User'}
									/>
									<AvatarFallback>
										{session.user.name?.[0]?.toUpperCase() ||
											'U'}
									</AvatarFallback>
								</Avatar>
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>
								{session.user.name}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								<LogOut />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				)}
			</div>
		</div>
	)
}

function ListItem({
	title,
	children,
	href,
	...props
}: React.ComponentPropsWithoutRef<'li'> & { href: string }) {
	return (
		<li {...props}>
			<NavigationMenuLink asChild>
				<Link href={href}>
					<div className="text-sm leading-none font-medium">
						{title}
					</div>
					<p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	)
}
