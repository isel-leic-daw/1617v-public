import React from 'react'
import Fetcher from './Fetcher'
import Pager from './Pager'

export default ({url, render}) => (
  <Fetcher url={url}
    render={(loading, resp, body, fetch) => (
      <Pager loading={loading} resp={resp} body={body} fetch={fetch}
        on200={render}
        on403={(resp, body) =>
          <span>Forbidden (exceed rate limit)</span>
        }
        on404={(resp, body) =>
          <span>Not found</span>
        }
        on505={(resp, body) =>
          <span>Internal server error</span>
        }
        onLoading={(resp, body) =>
          <img src='loading.gif' alt='loading' />
        }
      />
    )}
  />
)
