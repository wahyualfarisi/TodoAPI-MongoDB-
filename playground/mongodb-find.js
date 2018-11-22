// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if(err){
    return console.log('Unable to connect to MongoDB client');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({_id: new ObjectID('5bf6f521a9d6271f1da0d109')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2) );
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // })

  // db.collection('Todos').find().count().then((docs) => {
  //   console.log('Todos', docs);
  //   // console.log(JSON.stringify(docs, undefined, 2) );
  // }, (err) => {
  //   console.log('Unable to fetch Todos', err);
  // })


  db.collection('Users').find({
    name: 'Wahyu'
  }).toArray().then((result) => {
    console.log('User');
    console.log(JSON.stringify(result, undefined, 2) )
  }, (err) => {
    console.log('Unable to fetch data User', err)
  })


  // db.close();
});
