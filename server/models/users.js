const validator = require('validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const config = require('./../config/jwt');

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
  var token  = jwt.sign({_id: user._id.toHexString(), access}, config.jwt).toString();

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then( () => {
    return token;
  })

}

UserSchema.statics.findByToken = function(token){
  var User = this;

  try{
    decoded = jwt.verify(token, config.jwt);
  }catch(e){
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}


UserSchema.statics.findByCredentials = function(email, password){
  var User = this;


  return User.findOne({email}).then( (user) => {
    if(!user){
      return Promise.reject()
    }

   return new Promise((resolve, reject) => {
     bcrypt.compare(password, user.password , (err, res) => {
      if(res){
        resolve(user)
      }else{
        reject();
      }
    });
  });
});
}

UserSchema.methods.removeToken = function(token){
  var user = this;
  return user.update({
    $pull: {
        tokens: {
          token: token
        }
    }
  });

}



UserSchema.pre('save', function(next) {
  var user = this;
  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err,hash) => {
        user.password = hash;
        next();
      })
    })
  }else{
    next();
  }
  // console.log('mongoose middleware is running');
})



var User = mongoose.model('Users', UserSchema );


module.exports = { User }
