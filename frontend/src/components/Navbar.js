import React, { Component } from 'react'

import config from '../config.json'

class Navbar extends Component {
  render () {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
        <a className='navbar-brand' href='/'>{config.brand}</a>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='navbar-collapse collapse w-100 order-3 dual-collapse2' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto ml-auto'>
            <li className='nav-item active'>
              <a className='nav-link' href='/categories'>Categories</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
