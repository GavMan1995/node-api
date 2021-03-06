require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const _ = require('lodash')

const { mongoose } = require('./db/mongoose')
const { Todo } = require('./models/todo')
const { User } = require('./models/user')
const { authenticate } = require('./middleware/authenticate')

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())

//=== TODOS ===\\
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

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id
  Todo.findByIdAndRemove(id)
    .then((todo) => {
      if (todo) {
        res.send({todo})
      } else {
        res.status(404).send({error: 'Id not found'})
      }
    })
    .catch((err) => {
      res.status(404).send({error: 'Not a valid Id'})
    })
})

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  let body = _.pick(req.body, ['text', 'completed'])

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id,
    {$set: body},
    {new: true})
    .then((todo) => {
      if (!todo) {
        return res.status(404).send({error: 'Todo doesnt exist'})
      }
      res.send({todo})
    })
    .catch((err) => {
      res.status(400).send()
    })
})

//=== USERS ===\\
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body)
  user.save()
    .then(() => {
      return user.generateAuthToken()
    })
    .then((token) => {
      res.header('x-auth', token).send(user)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
})

app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = {app}
