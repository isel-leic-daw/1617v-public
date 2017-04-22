test('creating promises from callbacks and asserting expectations', () => {
  let p = new Promise((resolve, reject) => {
    setTimeout(() => resolve('ok'), 500)
  })

  return p.then(v => expect(v).toBe('ok'))
})

function delay (m, d) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(m())
    }, d || 1000)
  })
}

function addAsync (a, b) {
  return delay(() => a + b)
}

test('chaining promises', () => {
  let p1 = delay(() => 1)
  let p2 = p1.then(v => v + 1)
  let p3 = p2.then(v => v + 2)
  let p4 = p3.then(v => v + 3)

  return p4.then(v => expect(v).toBe(7))
})

test('chaining promises with errors', () => {
  let p1 = delay(() => 1)
  let p2 = p1.then(v => v + 1)
  let p3 = p2.then(v => { throw new Error(v) })
  let p4 = p3.then(v => v + 3)

  return p4.catch(e => expect(e.message).toBe('2'))
})

test('chaining promises with async functions', () => {
  let p1 = delay(() => 1)
  let p2 = p1.then(v => addAsync(v, 1))
  let p3 = p2.then(v => addAsync(v, 2))
  let p4 = p3.then(v => addAsync(v, 3))

  return p4.then(v => expect(v).toBe(7))
})

test('chaining promises with async functions, errors and recover', () => {
  let p1 = delay(() => 1)
  let p2 = p1.then(v => addAsync(v, 1))
  let p3 = p2.then(v => { throw new Error() })
  let p4 = p3.then(v => addAsync(v, 3), e => addAsync(10, 3))

  return p4.then(v => expect(v).toBe(13))
})

test('using Promise.all method', () => {
  let p1 = Promise.all([1, 2, 3, 4].map(v => delay(() => v)))
  let p2 = p1.then(vs => vs.reduce((acc, v) => acc + v))
  return p2.then(v => expect(v).toBe(10))
})

test('using Promise.race method', () => {
  let p1 = Promise.race([2, 1, 3, 4].map(v => delay(() => v, v * 1000)))
  return p1.then(v => expect(v).toBe(1))
})
