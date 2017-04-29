const test = require('blue-tape')

// test('example', t => {
//   t.plan(1)
//   setTimeout(() => {
//     t.equal('b', 'b')
//   }, 1000)
// })

function incr (n, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(n + 1), delay || 1000)
  })
}

test('promises', t => {
  const n = 1
  const p1 = incr(n)
  const p2 = p1.then(v => v + 1)
  const p3 = p2.then(v => incr(v))

  return p3.then(v => t.equal(v, 4))
})

test('promises with errors', t => {
  t.plan(1)
  const n = 1
  const p1 = incr(n)
  const p2 = p1.then(_ => { throw new Error() })
  const p3 = p2.then(v => incr(v), e => 4)

  p3.then(v => t.equal(v, 4))
})

test('promise chains', t => {
  t.plan(1)
  const n = 1
  incr(n)
  .then(_ => { throw new Error() })
  .then(v => incr(v), e => 4)
  .then(v => t.equal(v, 4))
})

test('promise chains with catch', t => {
  t.plan(1)
  const n = 1
  incr(n)
  .then(_ => { throw new Error() })
  .then(v => incr(v))
  .then(v => t.equal(v, 4))
  .catch(e => t.pass())
})

test('Promise.all', t => {
  t.plan(2)
  const a = [incr(1), incr(2)]
  const p = Promise.all(a)
  p.then(v => {
    t.equal(v[0], 2)
    t.equal(v[1], 3)
  })
})

test('Promise.race', t => {
  const a = [incr(1, 2000), incr(2)]
  const p = Promise.race(a)
  return p.then(v => {
    t.equal(v, 3)
  })
})
