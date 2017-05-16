import React from 'react'
import Counter from './Counter'

export default class CounterList extends React.Component {
  constructor (props) {
    super(props)
    console.log('CounterList::ctor')
    this.state = {sum: 6}
  }

  handleChange (oldValue, newValue) {
    this.setState(({sum}) => ({sum: sum + (newValue - oldValue)}))
  }

  render () {
    console.log('CounterList::render')
    return (
      <div>
        {[1, 2, 3].map(i => (
          <Counter key={i} onChange={this.handleChange.bind(this)} initialValue={i} />
        ))}
        <div>
          {this.state.sum}
        </div>
      </div>
    )
  }
}
