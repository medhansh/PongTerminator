import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Pong from "./components/Pong";
import "./index.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="game-container">
        <Pong />
      </div>
    </QueryClientProvider>
  );
}

export default App;
