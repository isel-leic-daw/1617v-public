import React from 'react'

export default props => (
  <table>
    <tbody>
      <tr><td>Number</td><td>Name</td></tr>
      {props.students.map(s => <tr key={s.number}><td>{s.number}</td><td>{s.number}</td></tr>)}
    </tbody>
  </table>
)
