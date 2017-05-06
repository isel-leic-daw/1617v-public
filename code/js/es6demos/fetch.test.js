const test = require('blue-tape')
const fetch = require('isomorphic-fetch')
const URLSearchParams = require('url-search-params')

test('simple GET', t => {
  return fetch('http://httpbin.org/get')
    .then(resp => {
      t.equal(resp.status, 200)
    })
})

test('access body', t => {
  return fetch('http://httpbin.org/get')
    .then(resp => {
      t.equal(resp.headers.get('Content-Type'), 'application/json')
      t.equal(resp.status, 200)
      return resp.json()
    })
    .then(body => {
      t.equal(body.headers.Host, 'httpbin.org')
    })
})

test('access body', t => {
  return fetch('http://httpbin.org/get', {
    headers: {
      'Authorization': 'Bearer some-token'
    }
  })
    .then(resp => {
      t.equal(resp.headers.get('Content-Type'), 'application/json')
      t.equal(resp.status, 200)
      return resp.json()
    })
    .then(body => {
      t.equal(body.headers.Host, 'httpbin.org')
      t.equal(body.headers.Authorization, 'Bearer some-token')
    })
})

test('A 500 is not an error', t => {
  return fetch('https://httpbin.org/status/500', {
    headers: {
      Authorization: 'bearer the-access-token'
    },
    redirect: 'manual'
  })
  .then(resp => t.equal(resp.status, 500))
})

test('Redirects', t => {
  return fetch('https://httpbin.org/status/302', {
    headers: {
      Authorization: 'bearer the-access-token'
    },
    redirect: 'manual'
  })
  .then(resp => t.equal(resp.status, 302))
})

test('POST payload', t => {
  const form = new URLSearchParams({
    'name1': 'value1',
    'name2': 'value2'}).toString()

  return fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Authorization': 'bearer the-access-token',
      'Content-Type': ' application/x-www-form-urlencoded',
      'Content-Length': form.length
    },
    body: form
  })
  .then(resp => resp.json())
  .then(json => t.deepEqual(json.form
  , {
    'name1': 'value1',
    'name2': 'value2'
  }))
})

function request (tries) {
  const status = tries > 0 ? 500 : 200
  const uri = `https://httpbin.org/status/${status}`
  return fetch(uri)
    .then(
      resp => {
        if (resp.status === 200) {
          return resp
        } else {
          if (tries > 0) {
            console.log(`retry, ${tries} left`)
            return request(tries - 1)
          } else {
            throw new Error()
          }
        }
      }
      , error => {
        if (tries > 0) {
          return request(tries - 1)
        } else {
          throw error
        }
      }
    )
}

test('simple GET with retries', t => {
  return request(5)
    .then(resp => {
      t.equal(resp.status, 200)
    })
})
