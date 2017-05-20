import React from 'react'
import parseLinkHeader from 'parse-link-header'

export default (props) => {
  const {loading, resp, body, fetch} = props
  const handler = loading ? props.onLoading : props[`on${resp.status}`]
  const linkHeader = !loading && resp.headers.get('Link')
  const parsed = linkHeader && parseLinkHeader(linkHeader)
  const buttons = parsed
    ? (
      <div>
        <button onClick={() => fetch(parsed.prev.url)} disabled={!parsed.prev} >prev</button>
        <button onClick={() => fetch(parsed.next.url)} disabled={!parsed.next} >next</button>
      </div>
    )
    : (
      <div>
        <button disabled >prev</button>
        <button disabled >next</button>
      </div>
    )
  return (
    <div>
      {buttons}
      {handler(resp, body)}
    </div>
  )
}
