const test = require('tape')

function getStudent () {
  return {
    name: 'Alice',
    number: 12345
  }
}

function getArray () {
  return [1, 2, 3, 4]
}

test('without destructuring', t => {
  const s = getStudent()
  t.equal(s.name, 'Alice')
  t.equal(s.number, 12345)
  t.end()
})

test('with destructuring', t => {
  const {name, number} = getStudent()
  t.equal(name, 'Alice')
  t.equal(number, 12345)
  t.end()
})

test('with destructuring 2', t => {
  const {name: nm, number: nu} = getStudent()
  t.equal(nm, 'Alice')
  t.equal(nu, 12345)
  t.end()
})

test('arrays destructuring', t => {
  const [ first, second ] = getArray()
  t.equal(first, 1)
  t.equal(second, 2)
  t.end()
})

test('arrays destructuring', t => {
  const [first, second, ...others] = getArray()
  t.equal(first, 1)
  t.equal(second, 2)
  t.deepEqual(others, [3, 4])
  t.end()
})
