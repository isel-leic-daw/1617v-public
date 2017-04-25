test('rest parameters', () => {
  function f (...args) {
    return args
  }

  function g (first, ...args) {
    return args
  }

  expect(f(1, 2, 3, 4)).toEqual([1, 2, 3, 4])
  expect(g(1, 2, 3, 4)).toEqual([2, 3, 4])
})
