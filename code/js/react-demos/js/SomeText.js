// Component
import React from 'react'
export default ({before, text, after}) => (
  <span>
    {before}
    <b>{text}</b>
    {after}
  </span>
)
