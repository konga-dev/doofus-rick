import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootIndex from "./pages";
import Fallback from "./pages/fallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootIndex />,
  },
  // 404
  {
    path: "*",
    element: <Fallback />,
  },
]);

function App() {
  return (
    <div className="bg-zinc-800 max-w-screen min-h-screen text-gray-100 flex justify-center py-24">
      <main className="flex space-y-8 flex-col w-[700px]">
        <header className="flex flex-row space-x-4 items-center">
          <img
            src="/doofus-rick.png"
            className="h-24 rounded-full"
            alt="doofus rick"
          />
          <div className="flex flex-col">
            <p className="text-2xl font-semibold">doofus-rick</p>
            <p>cause it can't get any worse than this</p>
          </div>
        </header>
        <RouterProvider router={router} />
        <footer>
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Josholaus
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
