const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    validate: {
      validator(email) {
        return validator.isEmail(email);},
      message: 'Строк не является адресом электронной',
    },
  },
  password: {
    type: String,
    required: true,
    unique:true,
  }


});

module.exports = mongoose.model('user', userSchema);
