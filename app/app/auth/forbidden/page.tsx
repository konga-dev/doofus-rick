'use client'

import Link from 'next/link'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export default function SignIn() {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex justify-center mt-4 text-lg md:text-xl">
					Oh no! :(
				</CardTitle>
				<CardDescription className="flex justify-center text-xs md:text-sm">
					Looks like you are not a member of our super awesome Discord
					server...
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<div className="flex justify-center w-full border-t py-4">
					<p className="text-center text-xs text-neutral-500">
						built by{' '}
						<Link
							href="https://josholaus.com"
							className="underline"
							target="_blank"
						>
							<span className="dark:text-white/70 cursor-pointer">
								josholaus.
							</span>
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	)
}
