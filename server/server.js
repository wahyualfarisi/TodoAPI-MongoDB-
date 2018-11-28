
const _          = require('lodash');
const express    = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo}     = require('./models/todo');
const {User}     = require('./models/users');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json() );

//------------------------------------------------------------------------------
app.post('/todos', (req, res) => {
  var insert = new Todo({
    text: req.body.text
  });

  insert.save().then( (doc) => {
    res.send(doc)
  }, (e) => {
    res.status(400).send(e)
  })
})
//------------------------------------------------------------------------------

app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos})
  }, (e) => {
    res.send(e)
  })
})

//------------------------------------------------------------------------------

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

    if(!ObjectID.isValid(id)){
      return res.status(400).send()
    }

    Todo.findById(id).then( (todo) => {
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    }, (e) => {
      res.status(400).send()
    })
})

//------------------------------------------------------------------------------

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id) ){
    return res.status(400).send()
  }

  Todo.findByIdAndDelete(id).then( (todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo})
  }, (e) => {
    res.status(400).send()
  })
})

//------------------------------------------------------------------------------

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;

  var body = _.pick(req.body, ['text', 'completed'] );

  if(!ObjectID.isValid(id) ){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed ){
    body.completedAt = new Date().getTime();
  }else{
    body.completed   = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then( (todo) => {
    if(!todo){
      res.status(404).send();
    }

    res.send({todo});

  }).catch( (e) => {
    res.status(400).send()
  })
})


// POST user
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var user = new User(body);
  user.save().then( () => {
    return user.generateAuthToken();
    // res.send(user)
  }).then( (token) => {
    res.header('x-auth', token).send(user)
  }).catch( (e) => {
    res.status(400).send(e)
  })

})





app.listen(port, () => {
  console.log(`staring on port ${port}`);
})


module.exports = { app };
