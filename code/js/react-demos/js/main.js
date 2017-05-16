// import SomeText from './SomeText'
import Counter from './Counter'
import CounterList from './CounterList'

const SomeText = require('./SomeText').default
const React = require('react')
const ReactDOM = require('react-dom')

console.log(SomeText)

const model = {
  students: [
    {name: 'Alice', number: 12345},
    {name: 'Bob', number: 12346}
  ]
}

// JSX
// Component
const StudentTable2 = ({students}) => (
  <table>
    <tbody>
      <tr><td>Number</td><td>Name</td></tr>
      {students.map(s => (
        <tr><td>{s.number}</td><td>{s.name}</td></tr>
      ))}
    </tbody>
  </table>
)

const App = (props) => (
  <div>
    <CounterList names={model.students.map(s => s.name)} />
  </div>
)

ReactDOM.render(
  <App students={model.students} />,
  document.getElementById('placeholder')
)
