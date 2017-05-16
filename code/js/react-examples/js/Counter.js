import React from 'react'

export default class Counter extends React.Component {
  constructor (props) {
    console.log('Counter::ctor')
    super(props)
    this.state = {counter: props.initialValue || 0}
    this.onChange = props.onChange || (() => {})
  }

  up () {
    console.log('Counter::up')
    this.onChange(this.state.counter, this.state.counter + 1)
    this.setState(({counter}) => ({counter: counter + 1}))
  }
  down () {
    console.log('Counter::down')
    this.onChange(this.state.counter, this.state.counter - 1)
    this.setState(({counter}) => ({counter: counter - 1}))
  }


  render () {
    console.log('Counter::render')
    return (
      <div>
        <button onClick={this.down.bind(this)}>-</button>
        {this.state.counter}
        <button onClick={this.up.bind(this)}>+</button>
      </div>
    )
  }

  componentWillReceiveProps (newProps) {
    console.log(`Counter::componentWillReceiveProp`)
    console.table(newProps)
  }
}
