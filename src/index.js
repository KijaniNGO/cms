import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import enUS from 'antd/lib/locale-provider/en_US'
import LocaleProvider from 'antd/lib/locale-provider'
import 'typeface-merriweather-sans'

import DatePicker from 'antd/lib/date-picker'
import message from 'antd/lib/message'

class App extends React.Component {
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
            <div style={{ width: 400, margin: '100px auto' }}>
                <DatePicker onChange={value => this.handleChange(value)} />
                <div style={{ marginTop: 20 }}>Date: {this.state.date && this.state.date.toString()}</div>
            </div>
        )
    }
}

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <App />
    </LocaleProvider>,
    document.getElementById('root'),
)

registerServiceWorker()
