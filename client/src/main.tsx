import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppContextProvider } from "./context/AppContext.tsx";
import { Toaster } from "sonner";
import { SearchContextProvider } from "./context/SearchContext.tsx";
import { classNames, icons } from "./utils/toasterOptions.tsx";



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
            <App />
            <Toaster
              icons={icons}
              toastOptions={{ classNames }}
            />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
