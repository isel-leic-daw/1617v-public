import React from 'react'

export default class FormExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {text: ''}
  }

  handleSubmit () {
    console.log(`submit ${this.state.text}`)
  }

  handleChange (e) {
    console.log(`change ${e.target.value}`)
    console.table(e)
    this.setState({text: e.target.value.toUpperCase()})
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' onChange={this.handleChange.bind(this)} name='input0' value={this.state.text} />
      </form>
    )
  }
}
