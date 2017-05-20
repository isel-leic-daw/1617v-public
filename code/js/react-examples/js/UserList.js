import React from 'react'
import User from './user'

export default ({users}) => (
  <div>
    {users.map(user => <User {...user} key={user.id} />)}
  </div>
)
