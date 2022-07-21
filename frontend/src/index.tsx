import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';


// importing of essential
import store from './redux/store';
import {backendGraphQlUrl} from './default'


// importing of components
import App from './components/app/App';
import LoginPage from './pages/Login/LoginPage';
import LogOut from './pages/Login/LogOut';


// below, we setup the graphQl client
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link : new HttpLink({
        uri: backendGraphQlUrl
    })
})

// get set to render our components
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route path='/' element={<App />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/logout' element={<LogOut />} />
                </Routes>
            </Router>
            
        </ApolloProvider>
    </Provider>
);