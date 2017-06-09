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

import { DatePicker, message } from './antd'

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

class Datepicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
        }
    }
    handleChange(date) {
        message.info(`Selected Date: ${date && date.toString()}`)
        this.setState({ date })
    }
    render() {
        return (
            <div>
                <h1>Datepicker</h1>
                <DatePicker style={{ marginTop: 20 }} onChange={value => this.handleChange(value)} />
                <div style={{ marginTop: 20 }}>Date: {this.state.date && this.state.date.toString()}</div>
            </div>
        )
    }
}

const Home = () =>
    <div>
        <h1>Hello World</h1>
        <Link to="datepicker">Datepicker</Link>
    </div>

const PageNotFound = () =>
    <div>
        <h1>Oops, that page doesn't exist</h1>
    </div>

const routes = {
    '/datepicker': Datepicker,
}

const logout = () => {
    console.log('logout')
}

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <LocaleProvider locale={enUS}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route
                        exact
                        path="/"
                        render={() =>
                            <Menu routes={routes} onLogout={logout}>
                                <Home />
                            </Menu>}
                    />,
                    {Object.keys(routes).map(path =>
                        <Route
                            key={path}
                            path={path}
                            render={() => {
                                const Component = routes[path]
                                return (
                                    <Menu routes={routes} onLogout={logout}>
                                        <Component />
                                    </Menu>
                                )
                            }}
                        />,
                    )}
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>
        </LocaleProvider>
    </ApolloProvider>,
    document.getElementById('root'),
)

registerServiceWorker()
