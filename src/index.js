import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import enUS from 'antd/lib/locale-provider/en_US'
import LocaleProvider from 'antd/lib/locale-provider'
import 'typeface-merriweather-sans'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

import Menu from 'Menu'
import Login from 'Login'
import LoadingScreen from 'LoadingScreen'
import AuthProvider from 'AuthProvider'

import { Datepicker, Home, PageNotFound } from 'Pages'

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: process.env.REACT_APP_API_URL }).use([
        {
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {}
                }
                // get the authentication token from local storage if it exists
                if (localStorage.getItem('graphcoolToken')) {
                    req.options.headers.authorization = `Bearer ${localStorage.getItem(
                        'graphcoolToken'
                    )}`
                }
                next()
            }
        }
    ])
})

const routes = {
    '/datepicker': Datepicker
}

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <LocaleProvider locale={enUS}>
            <BrowserRouter>
                <AuthProvider loginComponent={Login} loadingComponent={LoadingScreen}>
                    <Menu routes={routes} onLogout={AuthProvider.logout}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            {Object.keys(routes).map(path =>
                                <Route key={path} path={path} component={routes[path]} />
                            )}
                            <Route component={PageNotFound} />
                        </Switch>
                    </Menu>
                </AuthProvider>
            </BrowserRouter>
        </LocaleProvider>
    </ApolloProvider>,
    document.getElementById('root')
)

registerServiceWorker()
