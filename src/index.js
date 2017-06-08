import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import enUS from 'antd/lib/locale-provider/en_US'
import LocaleProvider from 'antd/lib/locale-provider'
import 'typeface-merriweather-sans'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Menu from 'Menu'

import { DatePicker, message } from './antd'

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

const routes = {
    '/': Home,
    '/datepicker': Datepicker,
}

const logout = () => {
    console.log('logout')
}

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <BrowserRouter>
            <Menu routes={routes} onLogout={logout}>
                {Object.keys(routes).map(path => <Route key={path} exact path={path} component={routes[path]} />)}
            </Menu>
        </BrowserRouter>
    </LocaleProvider>,
    document.getElementById('root'),
)

registerServiceWorker()
