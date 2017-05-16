import React from 'react'

// <Counter initialValue=123 name='counter1' onChange={...}/>
// counter1: [-]123[+]
// functional component: props -> ElementTree
// statefull component: (props, state) -> ElementTree

export default class Counter extends React.Component {
  constructor (props) {
    super(props)
    console.log('Counter ctor')
    this.state = {counter: props.initialValue}
    this.onChange = this.props.onChange || (_ => {})
  }

  handleDown () {
    console.log('Counter handleDown')
    this.onChange(this.state.counter, this.state.counter - 1)
    this.setState(oldState => ({counter: oldState.counter - 1}))
  }

  handleUp () {
    console.log('Counter handleUp')
    this.onChange(this.state.counter, this.state.counter + 1)
    this.setState(({counter}) => ({counter: counter + 1}))
  }

  render () {
    console.log('Counter render')
    return (
      <div>
        {this.props.name}
        <button onClick={this.handleDown.bind(this)}>-</button>
        {this.state.counter}
        <button onClick={this.handleUp.bind(this)}>+</button>
      </div>
    )
  }

  componentDidMount () {
    console.log('Counter ComponentDidMount')
  }

  componentWillReceiveProps () {
    console.log('Counter componentWillReceiveProps')
  }

  shouldComponentUpdate () {
    console.log('Counter shouldComponentUpdate')
    return false
  }

  componentWillUnmount () {
    console.log('Counter componentWillUnmount')
  }
}
