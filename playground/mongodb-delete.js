const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB server')
  }
//deleteMany
  db.collection('Users').deleteMany({name: 'Gavyn'}).then((res) => {
    console.log(res.result.n)
  })

//deleteOne
  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((res) => {
  //   console.log(res.result.n)
  // })

//findOnAndDelete
  // db.collection('Todos').findOneAndDelete({completed: true}).then((res) => {
  //   console.log(res.value)
  // })


// db.close()
})
