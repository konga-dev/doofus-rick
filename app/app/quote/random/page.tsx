import { RandomQuoteButtonInjector } from '@/app/quote/random/random-quote-button'
import RequiresAuth from '@/components/ui/auth/requires-auth'
import Quote from '@/components/ui/quote/quote'
import { client } from '@/lib/treaty'

export default async function Random() {
	const { data, error } = await client.quote.random.get()

	if (error || !data) {
		return <div>dei muada</div>
	}

	return (
		<RequiresAuth>
			<RandomQuoteButtonInjector />
			<div className="flex items-center justify-center gap-4">
				<Quote
					key={data._id}
					content={data.content}
					creator={data.creator}
					timestamp={data.timestamp}
					participants={data.participants}
					votes={data.votes}
				/>
			</div>
		</RequiresAuth>
	)
}
