const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();

const personApiRoutes = require('./routes/api-person-routes');

// разукрашивают сообщения в консоли
const errorMsg = chalk.bgKeyword('white').redBright;
const successMsg = chalk.bgKeyword('green').white;

const app = express();

// process.env. скрывает приватные данные для публичных репо
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log(successMsg('connected to DB')))
  .catch((error) => console.log(errorMsg(error)));

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Listening port ${process.env.PORT}`));
});

app.use(express.json());

// middleware  который выводит данные сразу после получения запроса
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms'),
);

app.use(cors());

// миддлвар для парсинга строки запроса
// app.use(express.urlencoded({ extended: false }));

app.use(personApiRoutes);

app.use((req, res) => {
  res.status(404).send({ error: `page ${req.url} not found` });
});
