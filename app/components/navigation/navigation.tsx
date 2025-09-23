'use client'

import { FilePlus, PencilLine } from 'lucide-react'
import Link from 'next/link'
import type React from 'react'
import { useNavigation } from '@/components/navigation/navigation-context'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '../ui/navigation-menu'

export default function Navigation() {
	const { extraItems } = useNavigation()

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
											href="/"
										>
											<div className="flex flex-row items-center gap-2 mt-4 mb-2">
												<Avatar>
													<AvatarImage
														src="/doofus-rick.png"
														alt="CN"
													/>
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
								<ListItem href="/random" title="Random quote">
									A random quote that brightens your day.
								</ListItem>
								<ListItem
									href="/cakeday"
									title="Cakeday quotes"
								>
									All quotes that celebrate their cakeday
									today.
								</ListItem>
								<ListItem href="/user" title="Your quotes">
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
			<div className="flex items-center gap-2">{extraItems}</div>
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
