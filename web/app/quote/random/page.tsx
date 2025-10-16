import type { Treaty } from '@elysiajs/eden'
import { RandomQuoteButtonInjector } from '@/app/quote/random/random-quote-button'
import RequiresAuth from '@/components/ui/auth/requires-auth'
import Quote from '@/components/ui/quote/quote'
import { client } from '@/lib/treaty'

export default async function Random() {
	const { data, error } = await client.quote.random.get()

	if (error || !data) {
		return <div>dei muada</div>
	}

	const quote = data as Treaty.Data<typeof client.quote.get>[number]

	return (
		<RequiresAuth>
			<RandomQuoteButtonInjector />
			<div className="flex items-center justify-center gap-4">
				<Quote
					key={quote.id}
					content={quote.content}
					creator={quote.creator}
					timestamp={quote.timestamp}
					participants={quote.participants}
					votes={quote.votes}
				/>
			</div>
		</RequiresAuth>
	)
}
