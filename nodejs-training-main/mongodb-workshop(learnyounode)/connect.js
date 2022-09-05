mongo = require('mongodb').MongoClient

  const url = 'mongodb://localhost:27017/learnyoumongo'
  mongo.connect(url, function(err, db) {
    if (err) {
      return this.emit('fail', 'Error connecting to mongo. ' + err.message)
    }

    this.emit('pass', 'Successfully connected to MongoDB')
  })
