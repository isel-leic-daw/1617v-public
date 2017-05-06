// import SomeText from './SomeText'
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

// Component
const StudentTable = (props) => (
  React.createElement('table', {},
    React.createElement('tbody', {},
      React.createElement('tr', {},
        React.createElement('th', {}, 'number'),
        React.createElement('th', {}, 'name')),
      props.students.map(s => (
        React.createElement('tr', {},
          React.createElement('td', {}, s.number),
          React.createElement('td', {}, s.name)))
      )))
)

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
    <SomeText before='[' after=']' text='hello' />
    <StudentTable2 students={props.students} />
    <StudentTable2 students={props.students} />
    <StudentTable2 students={props.students} />
  </div>
)

ReactDOM.render(
  <App students={model.students} />,
  document.getElementById('placeholder')
)

setInterval(() => {
  model.students.push({
    number: 12345,
    name: 'yas'
  })
  ReactDOM.render(
    <App students={model.students} />,
    document.getElementById('placeholder')
  )
}, 1000)
