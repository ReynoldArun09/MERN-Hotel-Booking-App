import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./context/AppContext.tsx";
import { Toaster } from "sonner";
import { SearchContextProvider } from "./context/SearchContext.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { classNames, icons } from "./utils/toasterOptions.tsx";

export const BASE_URL = import.meta.env.VITE_BASE_URL;
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY as string;
export const stripePromise = loadStripe(STRIPE_PUB_KEY);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <App />
            <Toaster
              icons={icons}
              toastOptions={{ classNames }}
            />
          </BrowserRouter>
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
