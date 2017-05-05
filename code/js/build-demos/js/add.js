// module that exports the add function

function aux (a, b) {
  return a + b
}

console.log('running...')

function add (a, b) {
  return aux(a, b)
}

// CommonJS - defines a module systems for JavaScript
module.exports = add
