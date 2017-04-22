test('basic object destructuring', () => {
  function getStudent () {
    return {name: 'Alice', number: 12345}
  }

  const {name, number} = getStudent()
  expect(name).toBe('Alice')
  expect(number).toBe(12345)
})

test('object destructuring', () => {
  function getStudent () {
    return {name: 'Alice', number: 12345}
  }

  const {name: studentName, number: studentNumber} = getStudent()
  expect(studentName).toBe('Alice')
  expect(studentNumber).toBe(12345)
})

test('object destructuring with coertion', () => {
  const {length, toUpperCase} = 'abc'
  expect(length).toBe(3)
  expect(toUpperCase.apply('abc')).toBe('ABC')
})

test('array destructuring', () => {
  function doSomething () {
    return [1, 2]
  }

  const [first, second] = doSomething()
  expect(first).toBe(1)
  expect(second).toBe(2)
})

test('array destructuring and rest', () => {
  const [head, ...tail] = [1, 2, 3, 4]
  expect(head).toBe(1)
  expect(tail).toEqual([2, 3, 4])
})

test('nested destructuring', () => {
  const [{a, b}] = [{a: 1, b: 'a'}]
  expect(a).toBe(1)
  expect(b).toBe('a')
})

test('destructuring in function arguments', () => {
  function doSomething ({name, number}) {
    expect(name).toBe('Alice')
    expect(number).toBe(12345)
  }
  const alice = {name: 'Alice', number: 12345}
  doSomething(alice)
})
