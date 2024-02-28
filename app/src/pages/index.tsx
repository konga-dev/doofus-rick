import { Quote } from '@/components/quote'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { edenFetch } from '@elysiajs/eden'
import { ChangeEvent, useEffect, useState } from 'react'
import type { Server } from '../../../server/src/elysia/Server'

const SKELETON_COUNT = 3

const fetch = edenFetch<Server>('http://localhost:3000')

function RootIndex() {
    const [loading, setLoading] = useState(false)
    const [quotes, setQuotes] = useState<Quote[]>([])
    const [search, setSearch] = useState<string>('')

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearch(value)
    }

    useEffect(() => {
        setLoading(true)
        fetch('/quote/', {}).then((response) => {
            setLoading(false)
            if (response.data) setQuotes(response.data)
        })
    }, [])

    return (
        <>
            <Input placeholder="Search..." onChange={onSearch} />
            <section className="flex flex-col space-y-4">
                {loading
                    ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                          <Skeleton key={index} className="w-full h-48 rounded-xl bg-zinc-900" />
                      ))
                    : quotes
                          .filter(
                              (quote) =>
                                  search.length == 0 ||
                                  quote.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
                          )
                          .map((quote) => <Quote key={quote._id} quote={quote} />)}
            </section>
        </>
    )
}

export default RootIndex
