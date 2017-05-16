import React from 'react'

export default class Delayed extends React.Component {
  constructor (props) {
    super(props)
    this.state = {done: false}
  }

  render () {
    console.log('Delayed render')
    return this.state.done
      ? <span>Done</span>
      : <span>...</span>
  }

  componentDidMount () {
    console.log('Delayed componentDidMount')
    const self = this
    setTimeout(() => {
      self.setState({done: true})
    }, 2000)
  }
}
