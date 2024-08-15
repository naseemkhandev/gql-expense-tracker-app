import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";
import GridBackground from "./components/ui/gridBackground.jsx";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_URL}`,
  cache: new InMemoryCache(),
  credentials: "include",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GridBackground>
        <ApolloProvider client={client}>
          <Toaster />
          <App />
        </ApolloProvider>
      </GridBackground>
    </BrowserRouter>
  </StrictMode>
);
