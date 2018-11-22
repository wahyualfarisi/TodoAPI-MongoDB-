// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connect to MongoDB client');
  }
  console.log('Connected to MongoDB server');

  //deleteMany

  //deleteOne


  //findeOneAndDelete
  db.collection('Users').deleteMany({name: 'Wahyu'}).then( (result) => {
    console.log(result);
  })

  // db.close();
});
