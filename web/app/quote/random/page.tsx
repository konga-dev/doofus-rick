import { RandomQuoteButtonInjector } from '@/app/quote/random/random-quote-button'
import Quote from '@/components/ui/quote/quote'
import { client } from '@/lib/rpc/orpc'
import { prisma } from '@/prisma'
import type { Quote as QuoteModel } from '@prisma/client'

export default async function Random() {
	const count = await prisma.quote.count()
	const quote = (await prisma.quote.findFirst({
		skip: Math.floor(Math.random() * count),
	})) as QuoteModel

	const { creator, participants } = await client.find({
		creator: quote.creator,
		participants: quote.participants,
	})

	return (
		<>
			<RandomQuoteButtonInjector />
			<div className="flex items-center justify-center gap-4">
				<Quote
					key={quote.id}
					content={quote?.content}
					creator={creator}
					timestamp={quote.timestamp}
					participants={participants}
					votes={quote.votes}
				/>
			</div>
		</>
	)
}
