import React from 'react'
import fetch from 'isomorphic-fetch'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {loading: true}
  }

  doGet (url) {
    this.setState({loading: true})
    fetch(url, {
      headers: {
        'Authorization': 'Bearer TODO'
      }})
      .then(resp => resp.status === 200
        ? resp.json().then(body => ({resp: resp, body: body}))
        : {resp: resp})
      .then(({resp, body}) => {
        this.setState({loading: false, resp: resp, body: body})
      })
  }

  componentDidMount () {
    this.doGet(this.props.url)
  }

  render () {
    const {loading, resp, body} = this.state
    return this.props.show(loading, resp, body, this.doGet.bind(this))
  }
}
