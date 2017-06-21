import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import enUS from 'antd/lib/locale-provider/en_US';
import LocaleProvider from 'antd/lib/locale-provider';
import 'typeface-merriweather-sans';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import App from './views';

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: process.env.REACT_APP_API_URL }).use([
        {
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {};
                }
                // get the authentication token from local storage if it exists
                if (localStorage.getItem('graphcoolToken')) {
                    req.options.headers.authorization = `Bearer ${localStorage.getItem(
                        'graphcoolToken'
                    )}`;
                }
                next();
            },
        },
    ]),
});

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <LocaleProvider locale={enUS}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </LocaleProvider>
    </ApolloProvider>,
    document.getElementById('root')
);

registerServiceWorker();
