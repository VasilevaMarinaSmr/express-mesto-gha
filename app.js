require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/auth");
const { login, createUser, logout } = require("./controllers/users");

const { PORT = 3000 } = process.env;
const NotFoundError = require("./errors/not-found-error");
const { urlTemplate } = require('./utils/url-template');
const app = express();
app.use(cookieParser());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlTemplate),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);
app.use(auth);
app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));
app.post("/signout", logout);

app.use('*', () => {
  throw new NotFoundError('Cтраница не существует');
});

app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});


app.listen(PORT);
