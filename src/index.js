import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

const App = () => <div>Hello World</div>

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
