jconst { SHA256 } = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

let pass = '123abc'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(pass, salt, (err, hash) => {
    console.log(hash)
  })
})

let hashedPassword = '$2a$10$qs8uB3zKajeP78Kmm7bdmufnbv3dChTkSMOi0l6R1AsxXMCEOhT2u'

bcrypt.compare(pass, hashedPassword, (err, res) => {
  console.log(res)
})

// let data = {
//   id: 4
// }
//
// let token = jwt.sign(data, '123abc')
// console.log(token)
//
// let decoded = jwt.verify(token, '123abc')
// console.log(decoded)

// let message = 'I am user number 3'
// let hash = SHA256(message).toString()
// console.log(message)
// console.log(hash)
//
// let data = {
//   id: 4
// }
//
// let token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somsecret').toString()
//
// if (resultHash === token.hash) {
//   console.log('data was not changed')
// } else {
//   console.log('data was changed')
// }
