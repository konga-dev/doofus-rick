/// <reference types="vite/client" />

// todo: fuck you, react
interface Quote {
  _id: any;
  content: string;
  timestamp: number;
  creator: {
    name: string;
    avatar: string;
  } | null;
  participants: ({
    name: string;
    avatar: string;
  } | null)[];
  votes: number;
}
