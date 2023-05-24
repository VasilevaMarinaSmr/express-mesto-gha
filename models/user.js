const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
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
