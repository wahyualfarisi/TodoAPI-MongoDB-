var express    = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {User}     = require('./models/users');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json() );

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

app.get('/todos', (req, res) => {
  Todo.find().then( (todos) => {
    res.send({todos})
  }, (e) => {
    res.send(e)
  })
})

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



app.listen(port, () => {
  console.log(`staring on port ${port}`);
})


module.exports = { app };
