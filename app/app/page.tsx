import { client } from '@/lib/treaty'

const { data, error } = await client.quote.get()
const x = data?.at(0)

export default async function Home() {
    return (
        <div className="font">

        </div>
    )
}
