import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "./store/store.ts";

const container = document.getElementById("root");
const root = createRoot(container!);

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    {/* // Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);
