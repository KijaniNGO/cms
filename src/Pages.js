import React from 'react'
import { Link } from 'react-router-dom'
import { DatePicker, message } from './antd'

export class Datepicker extends React.Component {
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
                <DatePicker
                    style={{ marginTop: 20 }}
                    onChange={value => this.handleChange(value)}
                />
                <div style={{ marginTop: 20 }}>
                    Date: {this.state.date && this.state.date.toString()}
                </div>
            </div>
        )
    }
}

export const Home = () =>
    <div>
        <h1>Hello World</h1>
        <Link to="datepicker">Datepicker</Link>
    </div>

export const PageNotFound = () =>
    <div>
        <h1>Oops, that page doesn't exist</h1>
    </div>
