const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')


// Todo.remove({})
//   .then((res) => {
//     console.log(res)
//   })

// Todo.findOneAndRemove({})

Todo.findByIdAndRemove('588f73d15ae9e41b6b48bf87')
  .then((todo) => {
    console.log(todo)
  })
