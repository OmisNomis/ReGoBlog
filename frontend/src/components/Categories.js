import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { splitArrayToChunks, uppercaseFirstLetter } from '../utils'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  async componentDidMount () {
    const resp = await axios.get(`/api/v1/categories`, {
      auth: {
        username: process.env.REACT_APP_API_USERNAME,
        password: process.env.REACT_APP_API_PASSWORD
      }
    })

    this.setState(resp.data)
  }
  render () {
    return (
      <div className='container mt-5 pt-3'>
        {
          splitArrayToChunks(this.state.data, 6).map((row, ix) => {
            return (
              <div className='row' key={ix}>
                {
                  row.map((category, index) => {
                    return (
                      <div key={index} className='col'>
                        <Link to={`/category/${category.name}`}>
                          <div className='card bg-light mb-3' style={{ maxWidth: '18rem' }}>
                            <div className='card-body'>
                              <h4 className='card-title'>{uppercaseFirstLetter(category.name)}</h4>
                              <h6 className='card-subtitle mb-2 text-muted'>Posts: {category.recent_posts.length}</h6>
                              {category.recent_posts.map((post, idx) => {
                                return <p key={idx} className='card-text'>{post.title}</p>
                              })}
                            </div>
                          </div>
                        </Link>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )
  }
}
