import React, { Component } from 'react'

import Logo from '../static/images/butter-logo.png'
import TwitterLogo from '../static/images/twitter-official.svg'
import LinkedinLogo from '../static/images/linkedin-icon.svg'

import config from '../config.json'

class Footer extends Component {
  render () {
    return (
      <nav className='navbar fixed-bottom navbar-light bg-light'>
        <div className='container-fluid'>
          <div className='row w-100'>
            <div className='col-4 footer-left text-left'>
              <span>
                Powered by <a rel='noopener noreferrer' target='_blank' href='https://buttercms.com'><img alt='' style={{ height: 30 }} src={Logo} /></a>
              </span>
            </div>
            <div className='col-4 footer-middle text-center'>
              <span className='pl-3'>
                <a rel='noopener noreferrer' target='_blank' href={config.social.twitter}><img alt='' style={{ height: 20 }} src={TwitterLogo} /></a>
              </span>
              <span className='pl-3'>
                <a rel='noopener noreferrer' target='_blank' href={config.social.linkedIn}><img alt='' style={{ height: 20 }} src={LinkedinLogo} /></a>
              </span>
            </div>
            <div className='col-4 footer-right text-right'>
              {/* Right */}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Footer
