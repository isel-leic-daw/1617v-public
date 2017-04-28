const fetch = require('isomorphic-fetch')
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
