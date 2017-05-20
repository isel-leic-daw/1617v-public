import React from 'react'
import fetch from 'isomorphic-fetch'

export default class Fetcher extends React.Component {
  constructor (props) {
    super(props)
    this.state = {loading: true}
  }

  handleFetch (url) {
    console.log(url)
    this.setState({loading: true})
    fetch(url, {
      headers: {
        // 'Authorization': 'Bearer TODO'
      }
    })
      .then(resp => {
        return resp.ok
          ? resp.json().then(body => ({resp: resp, body: body}))
          : {resp: resp}
      })
      .then(({resp, body}) => {
        this.setState({loading: false, resp: resp, body: body})
      })
  }

  componentDidMount () {
    this.handleFetch(this.props.url)
  }

  render () {
    return this.props.render(this.state.loading, this.state.resp, this.state.body, this.handleFetch.bind(this))
  }
}
