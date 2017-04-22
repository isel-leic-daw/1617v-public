test('simple array iteration', () => {
  function hasFour (iterable) {
    const iterator = iterable[Symbol.iterator]()
    expect(iterator.next()).toEqual({done: false, value: 1})
    expect(iterator.next()).toEqual({done: false, value: 2})
    expect(iterator.next()).toEqual({done: false, value: 3})
    expect(iterator.next()).toEqual({done: false, value: 4})
    expect(iterator.next()).toEqual({done: true})
  }
  hasFour([1, 2, 3, 4])
})

test('for over iterators', () => {
  let a = [1, 2, 3]
  let i = 1
  for (const e of a) {
    expect(e).toBe(i)
    i += 1
  }
})

test('custom iterator', () => {
  let iterable = {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: 1,
        done: false
      })
    })
  }

  let i = 1000
  for (const e of iterable) {
    expect(e).toBe(1)
    if (i === 0) break
    i -= 1
  }
})

test('generators example', () => {
  let iterable = {
    [Symbol.iterator]: () => ({
      next: () => ({
        value: 1,
        done: false
      })
    })
  }

  function * take (iterable, n) {
    let i = n
    for (const e of iterable) {
      yield e
      if (--i === 0) {
        break
      }
    }
  }

  expect(Array.from(take(iterable, 4))).toEqual([1, 1, 1, 1])
})
