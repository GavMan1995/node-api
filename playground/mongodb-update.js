const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB server')
  }

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('58794d6d88358a312dadcfda')
  }, {
    $set: {
      location: 'Kaysville',
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res)
  })

// db.close()
})
