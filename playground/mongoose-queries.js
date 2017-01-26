const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')


// let id = '58813cab5adacdf6e3eb57c'
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// })
//
//
// Todo.findById(id)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('ID not found')
//     }
//     console.log('Todo', todo)
//   })
//   .catch((err) => console.log(err))

let id = '587aea9122e65f9c8413e41f'

if (!ObjectID.isValid(id)) {
  console.log('ID not valid')
}

User.findById(id)
  .then((user) => {
    console.log(user)
  })
  .catch((err) => {
    console.log(err)
  })
