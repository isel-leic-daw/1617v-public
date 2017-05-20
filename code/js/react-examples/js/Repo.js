import React from 'react'
import {Link} from 'react-router-dom'

export default ({name, url, language, stargazers_count: stargazersCount, watchers_count: watcherCount}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <td><Link to={`/repos/${encodeURIComponent(url)}`}>{name}</Link></td>
          <td>{language}</td>
        </tr>
      </tbody>
    </table>
    <span>S: {stargazersCount}</span>,
    <span>W: {watcherCount}</span>
  </div>
)
