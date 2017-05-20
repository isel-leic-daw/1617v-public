import React from 'react'
import Counter from './Counter'
import Delayed from './Delayed'
import Input from './Input'

// <CounterList names={['a', 'b', 'c']}
export default class CounterList extends React.Component {
  constructor (props) {
    console.log('CounterList ctor')
    super(props)
    this.state = {counter: 0}
    this.boundHandleChange = this.handleChange.bind(this)
  }

  handleChange (oldValue, newValue) {
    console.log('CounterList handleChange')
    this.setState(({counter}) => ({counter: counter + newValue - oldValue}))
  }

  render () {
    console.log('CounterList render')
    const elems = (
      <div>
        <Input />
        <Delayed />
        {
          this.state.counter % 2 === 0
            ? this.props.names.map(name => (
              <Counter name={name} key={name} initialValue={0}
                onChange={this.boundHandleChange} />
              ))
            : <div />
        }
        Sum: {this.state.counter}
      </div>
    )
    console.log('CounterList render elems created')
    return elems
  }
}
