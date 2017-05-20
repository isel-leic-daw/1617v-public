import React from 'react'
import ReactDOM from 'react-dom'
import Fetcher from './Fetcher'
import Paginator from './Paginator'
import RepoList from './RepoList'

const App = (props) => (
  <div>

    <Fetcher url='https://api.github.com/users/pmhsfelix/followers?per_page=2'
      show={(loading, resp, body, get) => (
        loading
          ? <span>...loading...</span>
          : <div>
            <pre>
              {JSON.stringify(body)}
            </pre>
            <button onClick={() => get('https://api.github.com/users/pmhsfelix/followers?per_page=2')}>
              Refresh
            </button>
          </div>
      )} />

    <Fetcher url='https://api.github.com/users/pmhsfelix/repos?per_page=10'
      show={(loading, resp, body, get) => (
        <Paginator loading={loading} resp={resp} get={get} >
          <RepoList repos={body} />
        </Paginator>
      )} />

  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('placeholder')
)
