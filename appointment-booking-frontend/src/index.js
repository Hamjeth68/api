import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'; // Import setContext




const httpLink = createHttpLink({
  uri: 'http://localhost:5432/postgresql', // Update with your server address and GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  // Add authentication headers if needed
  return {
    headers: {
      ...headers,
      // Add any additional headers here
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

reportWebVitals();
