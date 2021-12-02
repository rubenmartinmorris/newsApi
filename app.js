const express = require('express');
const app = express();
const apiRouter = require('./routers/api.router');

app.use(express.json());

app.use('/api', apiRouter);

app.get('/', (req, res, next) => {
  res.status(200).send({ msg: 'Hello from my news api :)' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ msg: 'Invalid input' });
});

module.exports = app;
