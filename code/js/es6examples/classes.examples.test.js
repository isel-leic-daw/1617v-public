test('simple class', () => {
  class Student {
    constructor (name, number) {
      this.name = name
      this.number = number
    }

    toString () { return `Student '${this.name}' with number ${this.number}` }
  }

  let student = new Student('Alice', 12345)
  expect(student.toString()).toEqual('Student \'Alice\' with number 12345')
})

test('class is a function', () => {
  class Student {
    constructor (name, number) {
      this.name = name
      this.number = number
    }

    toString () { return `Student '${this.name}' with number ${this.number}` }
  }

  expect(typeof Student).toBe('function')
  expect(Student.prototype.toString).toBeDefined()
})
