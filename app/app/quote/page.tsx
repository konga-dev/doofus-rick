import RequiresAuth from '@/components/ui/auth/requires-auth'
import Quote from '@/components/ui/quote/quote'
import { client } from '@/lib/treaty'

export default async function Home() {
	const { data, error } = await client.quote.get()

	if (error || !data) {
		return <div> dei muada </div>
	}

	return (
		<RequiresAuth>
			<div className="flex flex-col items-center justify-center gap-4">
				{data.map(quote => (
					<Quote
						key={quote._id}
						content={quote.content}
						creator={quote.creator}
						timestamp={quote.timestamp}
						participants={quote.participants}
						votes={quote.votes}
					/>
				))}
			</div>
		</RequiresAuth>
	)
}
