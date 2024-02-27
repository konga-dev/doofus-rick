import {
  Card,
  CardContent,
  CardFooter,
} from "./ui/card";

interface QuoteProps {
  quote: string;
  creator: string;
  users: string[];
  timestamp: Date;
}
// todo: add quote participants

function Quote(props: QuoteProps) {
  return (
    <Card>
      <CardContent>
        <div className="flex space-x-4 items-center pt-8 px-8">
          <span className="font-serif text-8xl text-zinc-300">”</span>
          <p className="italic text-lg">{props.quote}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2 items-center">
          <span>Quoted by</span>
          <div className="h-4 w-4 rounded-full bg-zinc-300"></div>
          <span>{props.creator}</span>
        </div>
      </CardFooter>
    </Card>
  );
}

export { Quote };
