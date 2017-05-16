import React from 'react'

export default class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: ''}
  }

  handleChange (ev) {
    console.log(ev.target.value)
    this.setState({text: ev.target.value})
  }

  render () {
    return (
      <form>
        <input type='text' value={this.state.text}
          onChange={this.handleChange.bind(this)} />
      </form>
    )
  }
}
