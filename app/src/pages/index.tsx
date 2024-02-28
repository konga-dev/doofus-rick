import { Quote } from "@/components/quote";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { edenFetch, edenTreaty } from "@elysiajs/eden";
import { ChangeEvent, useEffect, useState } from "react";
import type { Server } from "../../../server/src/elysia/Server";

const SKELETON_COUNT = 3;

const fetch = edenFetch<Server>("https://localhost:3000");

// type X = typeof (app.quote[0].get())

function RootIndex() {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState<any>([]);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
  };

  useEffect(() => {
    setLoading(true);
    fetch("/quote/", {}).then((response) => {
      setLoading(false);
      setQuotes(response.data);
    });
  }, []);

  return (
    <>
      <Input placeholder="Search..." onChange={onSearch} />
      <section className="flex flex-col space-y-4">
        {loading
          ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-36 rounded-xl bg-zinc-600"
              />
            ))
          : quotes.map((quote: any) => (
              <Quote
                quote={quote.content}
                creator={quote.creator}
                users={quote.participants}
                timestamp={new Date(quote.timestamp)}
              />
            ))}
      </section>
    </>
  );
}

export default RootIndex;
