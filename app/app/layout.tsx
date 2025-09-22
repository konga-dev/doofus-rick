import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Navigation from '@/components/navigation'
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
					<div className="flex flex-row items-center gap-2 mt-4 ml-4">
						<Avatar className="h-24 w-24 rounded-full">
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
					<Navigation />
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
