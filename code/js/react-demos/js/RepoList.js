import React from 'react'
import Repo from './repo'

export default ({repos}) => (
  <table>
    <tbody>
      {repos.map(repo => <tr key={repo.id}><td><Repo {...repo} /></td></tr>)}
    </tbody>
  </table>
)
