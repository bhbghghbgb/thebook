import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";

import store from './store/store.ts'
import {Provider} from 'react-redux'
import {QueryClient, QueryClientProvider} from "react-query";

const container = document.getElementById('root');
const root = createRoot(container!);
const queryClient = new QueryClient();


root.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </Provider>
        </Router>
    </React.StrictMode>
);