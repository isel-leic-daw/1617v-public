import React from 'react'

export default ({name, description, owner}) => (
  <div>
    <ul>
      <li>Name: {name}</li>
      <li>Description: {description}</li>
      <li>Owner: {owner.name}</li>
    </ul>
  </div>
)
