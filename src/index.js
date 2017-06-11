import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import enUS from 'antd/lib/locale-provider/en_US'
import LocaleProvider from 'antd/lib/locale-provider'
import 'typeface-merriweather-sans'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'

import Menu from 'Menu'
import Login from 'Login'

import { Datepicker, Home, PageNotFound } from './Pages'

const apolloClient = new ApolloClient({
    networkInterface: createNetworkInterface({ uri: process.env.REACT_APP_API_URL }).use([
        {
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                    req.options.headers = {}
                }
                // get the authentication token from local storage if it exists
                if (localStorage.getItem('graphcoolToken')) {
                    req.options.headers.authorization = `Bearer ${localStorage.getItem('graphcoolToken')}`
                }
                next()
            },
        },
    ]),
})

const routes = {
    '/datepicker': Datepicker,
}

const login = (username, password, router) => {
    console.log('logged out')
    router.history.push('/')
}

const logout = router => {
    console.log('logged out')
    window.localStorage.removeItem('graphcoolToken')
    router.history.push('/login')
}

const LoggedOutRoute = () => <Login onLogin={login} />

const LoggedInRoutes = () =>
    <Menu routes={routes} onLogout={logout}>
        <Switch>
            <Route path="/" component={Home} />
            {Object.keys(routes).map(path => <Route key={path} path={path} component={routes[path]} />)}
            <Route component={PageNotFound} />
        </Switch>
    </Menu>

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <LocaleProvider locale={enUS}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={LoggedOutRoute} />
                    <Route path="/" component={LoggedInRoutes} />
                </Switch>
            </BrowserRouter>
        </LocaleProvider>
    </ApolloProvider>,
    document.getElementById('root'),
)

registerServiceWorker()
