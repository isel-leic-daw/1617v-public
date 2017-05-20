import React from 'react'

const style = {
  height: '20px',
  width: '20px'
}

export default ({login, avatar_url: avatarUrl}) => (
  <div>
    <img src={avatarUrl} alt={login} style={style} />
    <span> {login}</span>
  </div>
)
