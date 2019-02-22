import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'

class BlogList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      meta: {},
      data: [],
      page: 1
    }
  }

  async getPosts (page) {
    const resp = await axios.get(`/api/v1/posts/${page}`, {
      auth: {
        username: process.env.REACT_APP_API_USERNAME,
        password: process.env.REACT_APP_API_PASSWORD
      }
    })

    this.setState(Object.assign({}, { page }, resp.data))
  }

  componentWillReceiveProps (newProps) {
    const page = newProps.match.params.page
    if (page !== this.state.page) {
      this.getPosts(page)
    }
  }

  componentDidMount () {
    const page = this.props.match.params.page || 1

    this.getPosts(page)
  }

  render () {
    const nextPage = this.state.meta.next_page
    const previousPage = this.state.meta.previous_page

    return (
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto'>
            <div className='post-list'>
              {this.state.data.map((post, key) => {
                return (
                  <div key={key}>
                    <div className='post-preview'>
                      <Link to={`/blog/post/${post.slug}`}>
                        <h2 className='post-title'>{post.title}</h2>
                        <h3 className='post-subtitle'>{post.summary}</h3>
                      </Link>
                      <p className='post-meta'>{`Posted by ${post.author.first_name} ${post.author.last_name} on ${moment(post.published).format('MMMM Do, YYYY')}`}</p>
                    </div>
                    <hr />
                  </div>
                )
              })}
            </div>

            <div className='container'>
              <div className='row'>
                <div className='col text-left pr-0'>
                  {
                    previousPage ? (
                      <div className='clearfix'>
                        <Link className='btn btn-primary' to={`/blog/${previousPage}`}>
                        &larr; Newer Posts
                        </Link>
                      </div>
                    ) : null
                  }
                </div>
                <div className='col text-right pl-0'>
                  {
                    nextPage ? (
                      <div className='clearfix'>
                        <Link className='btn btn-primary' to={`/blog/${nextPage}`}>
                  Older Posts &rarr;
                        </Link>
                      </div>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BlogList
