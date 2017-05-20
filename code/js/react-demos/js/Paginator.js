import React from 'react'
import parseLinkHeader from 'parse-link-header'

const renderLoading = () =>
  <div>
    {renderButtons(true, true)}
    <img src='/loading.gif' />
  </div>

const renderButtons = (pdisabled, ndisabled, pOnClick, nOnClick) => (
  <div>
    <button onClick={pOnClick} disabled={pdisabled} >prev</button>
    <button onClick={nOnClick} disabled={ndisabled} >next</button>
  </div>
)

function renderResp (resp, get, children) {
  const linkHeader = resp.headers.get('Link')
  const parsed = linkHeader && parseLinkHeader(linkHeader)
  const buttons = parsed
    ? renderButtons(!parsed.prev, !parsed.next,
        () => get(parsed.prev.url),
        () => get(parsed.next.url))
    : renderButtons(true, true)
  return (
    <div>
      {buttons}
      {children}
    </div>
  )
}

export default ({loading, resp, get, children}) => (
  loading ? renderLoading() : renderResp(resp, get, children)
)
