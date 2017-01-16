const mongoose = require('mongoose')

//====User Model====\\
let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  name: {
    type: String,
    minlength: 1,
    default: 'New User'
  },
  age: {
    type: Number,
    minlength: 1,
    default: 0
  }
})

module.exports = {User}
