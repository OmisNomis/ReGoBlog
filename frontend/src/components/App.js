import React, { Component } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'

import Navbar from './Navbar'
import Footer from './Footer'

import BlogList from './BlogList'
import BlogPost from './BlogPost'
import Categories from './Categories'
import Category from './Category'

class App extends Component {
  constructor (props) {
    super(props)
    this.history = createHistory(this.props)
  }

  render () {
    return (
      <Router history={this.history}>
        <div>
          <Navbar history={this.history} />
          <div style={{ paddingBottom: 100 }}>
            <Switch>
              <Route path='/blog/:page' exact component={BlogList} />
              <Route path='/blog' exact component={BlogList} />
              <Route path='/blog/post/:post' component={BlogPost} />
              <Route path='/categories' exact component={Categories} />
              <Route path='/category/:category' exact component={Category} />

              <Route component={BlogList} />
            </Switch>

          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}
export default App
