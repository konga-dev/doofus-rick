import type { Treaty } from '@elysiajs/eden'
import { LucideQuote } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import type { client } from '@/lib/treaty'

type QuoteProps = Omit<Treaty.Data<typeof client.quote.get>[number], 'id'>

const readableDate = (timestamp: number) => {
	const quoteDate = new Date(timestamp)

	const weekday = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
	}).format(quoteDate)

	const date = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(quoteDate)

	const time = new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(quoteDate)

	return `${weekday}, ${date.replace(/-/g, '/')} ${time}`
}

export default function Quote({
	content,
	creator,
	timestamp,
	participants,
	votes,
}: QuoteProps) {
	return (
		<Card className="w-full">
			<CardHeader>
				<div className="flex items-center gap-2">
					<LucideQuote />
				</div>
			</CardHeader>
			<CardContent className="whitespace-pre-line">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{content}
				</ReactMarkdown>
			</CardContent>
			<CardFooter>
				<div className="flex flex-col items-start text-neutral-400 md:flex-row md:items-center md:space-x-2">
					<span>Captured by</span>
					<div className="flex items-center gap-2">
						<Avatar>
							<AvatarImage
								src={creator?.avatar}
								alt={creator?.name}
							/>
							<AvatarFallback />
						</Avatar>
					</div>
					<span>{creator?.name}</span>
					<span>on {readableDate(timestamp)}</span>
				</div>
			</CardFooter>
		</Card>
	)
}
