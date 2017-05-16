import React from 'react'
import ReactDOM from 'react-dom'
import StudentTable from './StudentTable'
import Counter from './Counter'
import CounterList from './CounterList'
import FormExample from './FormExample'
import TwoPanel from './TwoPanel'


const students = [
  {name: 'Alice', number: 12345},
  {name: 'Bob', number: 12346}
]

const App = props => (
  <div>
    <TwoPanel
      left={<Counter />}
      right={<StudentTable students={students} />}
    />
    <FormExample />
    <CounterList />
    <StudentTable students={students} />
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
