import Quote from '@/components/ui/quote/quote'
import { client } from '@/lib/rpc/orpc'
import { prisma } from '@/prisma'

export default async function Home() {
	const quotes = await prisma.quote.findMany({
		orderBy: { timestamp: 'desc' },
	})

	const populatedQuotes = await Promise.all(
		quotes.map(async quote => {
			const { creator, participants } = await client.find({
				creator: quote.creator,
				participants: quote.participants,
			})

			return { ...quote, creator, participants }
		}),
	)

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			{populatedQuotes.map(quote => (
				<Quote
					key={quote.id}
					content={quote.content}
					creator={quote.creator}
					timestamp={quote.timestamp}
					participants={quote.participants}
					votes={quote.votes}
				/>
			))}
		</div>
	)
}
