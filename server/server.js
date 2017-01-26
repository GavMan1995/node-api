const express = require('express')
const bodyParser = require('body-parser')
let { ObjectID } = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

let app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  })
  todo.save().then( (doc) => {
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos})
  }, (err) => {
    res.status(400).send(err)
  })
})

app.get('/todos/:id', (req, res) => {
  let id = req.params.id
  Todo.findById(id)
    .then((todo) => {
      if (todo) {
        res.send({todo})
      } else {
        res.status(404).send('Id not found')
      }
    })
    .catch((err) => {
      res.status(404).send('Not a valid Id')
    })
})

app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = {app}
