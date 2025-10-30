import type { Quote as QuoteModel } from '@prisma/client'
import {
	LucideChevronDown,
	LucideChevronUp,
	LucideQuote,
	LucideShare,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

type QuoteProps = Omit<QuoteModel, 'id' | 'creator' | 'participants'> & {
	creator: { name: string; avatar: string }
	participants: Array<{ name: string; avatar: string }>
}

const readableDate = (timestamp: Date) => {
	const weekday = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
	}).format(timestamp)

	const date = new Intl.DateTimeFormat('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(timestamp)

	const time = new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
	}).format(timestamp)

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

			<CardContent>
				<div className="flex justify-between items-center">
					<div className="whitespace-pre-line">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{content}
						</ReactMarkdown>
					</div>
					<div className="flex flex-col items-center text-neutral-500 ml-4">
						<button
							type="button"
							className="hover:text-orange-500 transition-colors cursor-pointer"
							aria-label="Upvote"
						>
							<LucideChevronUp className="w-6 h-6" />
						</button>
						<span className="text-md font-medium text-neutral-400">
							{votes}
						</span>
						<button
							type="button"
							className="hover:text-blue-500 transition-colors cursor-pointer"
							aria-label="Downvote"
						>
							<LucideChevronDown className="w-6 h-6" />
						</button>
					</div>
				</div>
			</CardContent>

			<CardFooter>
				<div className="flex items-center text-neutral-400 space-x-2">
					<span>Captured by</span>
					<Avatar>
						<AvatarImage
							src={creator?.avatar}
							alt={creator?.name}
						/>
						<AvatarFallback />
					</Avatar>
					<span>{creator?.name}</span>
					<span>on {readableDate(timestamp)}</span>
				</div>
			</CardFooter>
		</Card>
	)
}
