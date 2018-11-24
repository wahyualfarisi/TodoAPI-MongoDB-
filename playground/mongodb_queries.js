const {ObjectID} = require('mongoose');
const {mongoose} = require('./../server/db/mongoose');
const {Todo}     = require('./../server/models/todo');
const {User}    = require('./../server/models/users');
//
// var id = '5bf8c40ef7e93507280f23da';
//
// //
// // Todo.find({
// //   _id: id
// // }).then( (todos) => {
// //   console.log('Todos', todos)
// // });
// //
// // //
// // Todo.findOne({
// //   _id: id
// // }).then ( (todo) => {
// //   console.log('Todo', todo)
// // })
//
// Todo.findById(id).then( (todo) => {
//   if(!todo){
//     return console.log('id not found');
//   }
//
//   console.log('Todo by id', todo)
// }).catch( (e) => console.log(e) );

var id = '5bf8078f52a2c56ee816c6db';

User.findById(id).then( (user) => {
  if(!user){
    return console.log('user not found !');
  }

  console.log('user is', user);
})
