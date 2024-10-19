import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HungApp from './Book';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HungApp />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
