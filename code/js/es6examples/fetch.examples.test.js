const fetch = require('isomorphic-fetch')
const URLSearchParams = require('url-search-params')

const test = require('blue-tape')

test('GET and test of OK', t => {
  return fetch('https://httpbin.org/get')
  .then(resp => t.equal(true, resp.ok))
})

test('GET and access body', t => {
  return fetch('https://httpbin.org/get')
  .then(resp => resp.json())
  .then(json => t.equal(json.url, 'https://httpbin.org/get'))
})

test('GET and request headers', t => {
  return fetch('https://httpbin.org/get', {
    headers: {
      Authorization: 'bearer the-access-token'
    }
  })
  .then(resp => resp.json())
  .then(json => t.equal(json.headers.Authorization, 'bearer the-access-token'))
})

test('GET and status code', t => {
  return fetch('https://httpbin.org/status/301', {
    headers: {
      Authorization: 'bearer the-access-token'
    },
    redirect: 'manual'
  })
  .then(resp => t.equal(resp.status, 301))
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

test('accessing headers', t => {
  return fetch('https://httpbin.org/get', {
    headers: {
      Authorization: 'bearer the-access-token'
    }
  })
  .then(resp => t.equals(resp.headers.get('Content-Type'), 'application/json'))
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
  const status = tries === 0 ? 200 : 500
  const uri = 'https://httpbin.org/status/' + status
  console.log(`request, tries = ${tries}`)
  return fetch(uri)
    .then(
      resp => {
        if (resp.status === 200) {
          return resp
        } else {
          return request(tries - 1)
        }
      }
      , error => {
        if (tries !== 0) {
          return request(tries - 1)
        }
        throw error
      }
    )
}

test('retries', t => {
  return request(5)
    .then(resp => {
      t.equal(resp.status, 200)
    })
})
