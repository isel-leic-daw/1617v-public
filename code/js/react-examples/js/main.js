import React from 'react'
import ReactDOM from 'react-dom'

// const elem = React.createElement('p', {}, 'hello world')

const students = [
  {name: 'Alice', number: 12345},
  {name: 'Bob', number: 12346}
]

const studentTableComponent = props => React.createElement('table', {},
    React.createElement('tbody', {},
      React.createElement('tr', {},
        React.createElement('th', {}, 'Number'),
        React.createElement('th', {}, 'Name')),
      props.students.map(s => React.createElement('tr', {key: s.number},
        React.createElement('td', {}, s.number),
        React.createElement('td', {}, s.name)))))

const StudentTableComponent2 = props =>
  <table>
    <tbody>
      <tr><td>Number</td><td>Name</td></tr>
      {props.students.map(s => <tr key={s.number}><td>{s.number}</td><td>{s.number}</td></tr>)}
    </tbody>
  </table>

// let elem = React.createElement(studentTableComponent, {students: students})
// ReactDOM.render(
//   elem,
//   document.getElementById('root')
// )
ReactDOM.render(
  <StudentTableComponent2 students={students} />,
  document.getElementById('root')
)

let number = 12347
setInterval(() => {
  students.push({name: 'Yan', number: number})
  number += 1

  // elem = React.createElement(studentTableComponent, {students: students})
  // ReactDOM.render(
  //   elem,
  //   document.getElementById('root')
  // )
  ReactDOM.render(
    <StudentTableComponent2 students={students} />,
    document.getElementById('root')
  )
}, 200)
