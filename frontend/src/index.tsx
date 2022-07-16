import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import App from './components/app/App';
import {backendGraphQlUrl} from './default'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link : new HttpLink({
        uri: backendGraphQlUrl
    })
})
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);