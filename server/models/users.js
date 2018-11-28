const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 1,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value)
      },
      message: '{VALUE} is not valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//method

UserSchema.methods.toJSON = function(){
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email'] );

}

UserSchema.methods.generateAuthToken = function() {
  var user   = this;
  var access = 'auth';
  var token  = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then( () => {
    return token;
  })

}


var User = mongoose.model('Users', UserSchema );


module.exports = { User }
