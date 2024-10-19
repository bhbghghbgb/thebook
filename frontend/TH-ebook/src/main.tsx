import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
// import HungApp from './Book';
import './index.css';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
