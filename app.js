require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { PORT = 3000 } = process.env;
const { ERROR_DATA_NOT_FOUND } = require('./utils/errors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64733fbd6dfa5d681d77f8d7',
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use((req, res, next) => {
  res.status(ERROR_DATA_NOT_FOUND).send({ message: 'Cтраница не существует' });
  next();
});

app.listen(PORT);
