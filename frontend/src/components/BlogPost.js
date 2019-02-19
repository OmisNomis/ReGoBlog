import React from 'react'
import { Helmet } from 'react-helmet'
import Prism from 'prismjs'
import axios from 'axios'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {}
    }
  }

  async componentDidMount () {
    const { match } = this.props
    const resp = await axios.get(`/api/v1/post/${match.params.post}`, {
      auth: {
        username: process.env.REACT_APP_API_USERNAME,
        password: process.env.REACT_APP_API_PASSWORD
      }
    })
    this.setState(resp.data)

    Prism.highlightAll()
  }

  render () {
    const post = this.state.data

    return (
      <div>
        <Helmet>
          <title>{post.seo_title}</title>
          <meta name='description' content={post.meta_description} />
          <meta name='og:image' content={post.featured_image} />
        </Helmet>

        <div className='container mt-5'>
          <div className='row'>
            <div className='col-sm-10 col-md-8 offset-sm-1 offset-md-2 text-left'>
              <h2>{post.title}</h2>
            </div>
          </div>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-10 col-md-8 offset-sm-1 offset-md-2 text-left cms-content'>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
