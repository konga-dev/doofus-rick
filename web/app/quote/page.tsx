import Quote from '@/components/ui/quote/quote'
import {client} from "@/lib/treaty";

export default async function Home() {
    const {data, error} = await client.quote.get()

    if (error) {
        return <h1>dei muada</h1>
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            {data.map(quote => (
                <Quote
                    key={quote.id}
                    content={quote.content}
                    creator={quote.creator}
                    timestamp={quote.timestamp}
                    participants={[]}
                    votes={0}
                />
            ))}
        </div>
    )
}
