import { Card, CardContent, CardFooter } from "./ui/card";

interface QuoteProps {
  quote: Quote;
}
// todo: add quote participants

function Quote({ quote }: QuoteProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex space-x-4 items-center pt-8 px-8">
          <span className="font-serif text-8xl text-zinc-300">”</span>
          <p className="italic text-lg">{quote.content}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2 items-center">
          <span>Festgehalten von</span>
          <img
            className="h-6 rounded-full"
            src={quote.creator?.avatar}
            alt={`${quote.creator?.name}'s avatar`}
          ></img>
          <span>{quote.creator?.name}</span>
          <span>
            am{" "}
            {new Date(quote.timestamp).toLocaleDateString("de-AT", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export { Quote };
