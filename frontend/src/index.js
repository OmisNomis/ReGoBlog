import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './static/css/main.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

/** Prism */
import 'prismjs'
// Theme
import 'prismjs/themes/prism-okaidia.css'
// Plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
// Components
import 'prismjs/components/prism-go.min.js'
import 'prismjs/components/prism-java.min.js'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-jsx.min.js'

import ReactDOM from 'react-dom'

import App from './components/App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
