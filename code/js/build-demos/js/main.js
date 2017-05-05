// require - CommonJS
var add = require('./add')

const res = add(2, 3)

document.write(res)
document.write(`string literal${res}`)

class SomeClass {
  constructor (prm) {
    this.prm = prm
  }
}

document.write(new SomeClass())
