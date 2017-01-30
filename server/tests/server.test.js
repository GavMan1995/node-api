const expect = require('expect')
const request = require('supertest')

const {app} = require('./../server')
const {Todo} = require('./../models/todo')
const { ObjectID } = require('mongodb')

const todos = [
  {text: 'first test', _id: new ObjectID()},
  {text: 'second test', _id: new ObjectID()}
]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'hello this is a test'
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((err) => done(err))
      })
  })

  it('should not create a todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((err) => done(err))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return one todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return a 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 id invalid id', (done) => [
    request(app)
      .get('/todos/123')
      .expect(404)
      .end(done)
  ])
})


describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    let id = todos[0]._id.toHexString()

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(id)
          .then((todo) => {
            expect(todo).toNotExist()
            done()
          })
          .catch((err) => {
            done(err)
          })
      })
  })

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if invalid id', (done) => {
    request(app)
      .delete('/todos/123')
      .expect(404)
      .end(done)
  })
})
