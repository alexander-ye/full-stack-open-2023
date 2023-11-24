const express = require('express');
const app = express();
const config = require('./utils/config');
const cors = require('cors');
const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('connected to MongoDB'))
  .catch(error => logger.error(error)); 

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

module.exports = app;