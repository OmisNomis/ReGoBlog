import React from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'
import moment from 'moment'

import { uppercaseFirstLetter } from '../utils'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        recent_posts: []
      }
    }
  }
  async componentDidMount () {
    const { match } = this.props
    const resp = await axios.get(`/api/v1/category/${match.params.category}`, {
      auth: {
        username: process.env.REACT_APP_API_USERNAME,
        password: process.env.REACT_APP_API_PASSWORD
      }
    })
    this.setState(resp.data)
  }

  render () {
    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto text-center'>
            <h1 className='text-muted'>{this.state.data.name && uppercaseFirstLetter(this.state.data.name)}</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <div className='post-list'>
              {this.state.data.recent_posts.map((post, key) => {
                return (
                  <div key={key}>
                    <div className='post-preview'>
                      <Link to={`/blog/post/${post.slug}`}>
                        <h2 className='post-title'>{post.title}</h2>
                        <h3 className='post-subtitle'>{post.summary}</h3>
                      </Link>
                      <p className='post-meta'>{`Posted by ${post.author.first_name} ${post.author.last_name} on ${moment().format('MMMM Do, YYYY', post.published)}`}</p>
                    </div>
                    <hr />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
