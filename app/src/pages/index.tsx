import { Quote } from "@/components/quote";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangeEvent, useState } from "react";

const SKELETON_COUNT = 5;

function RootIndex() {
  const [loading, setLoading] = useState(false);

  const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log(value);
  };

  return (
    <>
      <Input placeholder="Search..." onChange={onSearch} />
      <section className="flex flex-col space-y-4">
        {loading ? (
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full h-20 rounded-xl bg-zinc-600"
            />
          ))
        ) : (
          <Quote
            quote={"i hob adipositas und an kluan schwonz"}
            creator={"155046312411267072"}
            users={["275342581821603842"]}
            timestamp={new Date()}
          />
        )}
      </section>
    </>
  );
}

export default RootIndex;
