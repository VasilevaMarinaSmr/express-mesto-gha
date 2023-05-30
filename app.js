require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { auth } = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const { NotFoundError } = require('./errors/datat-not-found-err');

const app = express();
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError({ message: 'Cтраница не существует' }));
});


app.listen(PORT);
