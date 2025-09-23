import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import type React from 'react'
import Navigation from '@/components/navigation/navigation'
import { NavigationProvider } from '@/components/navigation/navigation-context'
import { ThemeProvider } from '@/components/theme-provider'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'doofus-rick',
}

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					disableTransitionOnChange
				>
					<div className="flex flex-row items-center justify-center gap-2 mt-4 ml-4">
						<Avatar className="h-24 w-24 rounded-full mr-2">
							<AvatarImage src="/doofus-rick.png" alt="CN" />
						</Avatar>
						<div className="flex flex-col">
							<div className="text-2xl font-bold">
								doofus rick
							</div>
							<div className="italic">
								cause it can't get any worse than this
							</div>
						</div>
					</div>
					<div className="mx-auto mt-4 w-[600px]">
						<NavigationProvider>
							<Navigation />
							{children}
						</NavigationProvider>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
