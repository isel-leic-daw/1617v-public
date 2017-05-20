import React from 'react'
import ReactDOM from 'react-dom'
import RepoList from './RepoList'
import Pager2 from './Pager2'
import UserList from './UserList'
import Fetcher from './Fetcher'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Followers = () => (
  <div>
    <h1>Followers</h1>
    <Pager2 url='https://api.github.com/users/pmhsfelix/followers?per_page=2'
      render={(resp, body) => <UserList users={body} />} />
  </div>
)

const Repos = () => (
  <div>
    <h1>Repos</h1>
    <Pager2 url='https://api.github.com/users/pmhsfelix/repos?per_page=10'
      render={(resp, body) => <RepoList repos={body} />} />
  </div>
)

const RepoDetail = ({url}) => (
  <div>
    <h1>Repo</h1>
    <Fetcher url={url} render={(loading, resp, body) => (
      loading
      ? <img src='/loading.gif' alt='loading' />
      : <ul>
        <li>Name: {body.name}</li>
        <li>Description: {body.description}</li>
      </ul>
    )} />
  </div>
)

const App = props => (
  <div>
    <Router>
      <div>
        <ul>
          <li><Link to='/followers'>Followers</Link></li>
          <li><Link to='/repos'>Repos</Link></li>
        </ul>
        <Route path='/followers' component={Followers} />
        <Route path='/repos' exact component={Repos} />
        <Route path='/repos/:url' render={({match}) => <RepoDetail url={decodeURIComponent(match.params.url)} />} />
      </div>
    </Router>
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
