import {
	RandomQuoteButton,
	RandomQuoteButtonInjector,
} from '@/app/random/random-quote-button'
import Quote from '@/components/quote'
import { client } from '@/lib/treaty'

export default async function Random() {
	const { data, error } = await client.quote.random.get()

	if (error || !data) {
		return <div>dei muada</div>
	}

	return (
		<>
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
		</>
	)
}
