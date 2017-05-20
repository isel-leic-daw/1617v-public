import React from 'react'
import Repo from './Repo'

export default ({repos}) => (
  <div>
    {repos.map(repo => <Repo {...repo} key={repo.id} />)}
  </div>
)
