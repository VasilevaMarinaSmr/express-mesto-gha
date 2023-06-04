const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ErrorAuthorization = require('../errors/error-authorization');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Некорректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Строк не является адресом электронной',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorAuthorization('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new ErrorAuthorization(
              'Неправильные почта или пароль',
            ),
          );
        }
        return user; // теперь user доступен
      });
    });
};

module.exports = mongoose.model('user', userSchema);
