const jwt = require('jsonwebtoken')
const User = require('../models/user');
const logger = require('./logger');

const requestLogger = (request, resposne, next) => {
  logger.info('Method:', request.method);
  logger.info('Path: ', request.path);
  logger.info('Body: ', request.body);
  logger.info('---');
  next();
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'});
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    return response.status(401).json({ error: 'token invalid' })
  }

  next();
}

// To be used after tokenExtractor
const userExtractor = async (request, response, next) => {
  const token = request.token

  if (token) {
    decodedToken = jwt.verify(token, process.env.SECRET);
    if (!decodedToken.id) {
      request.user = response.status(401).json({error: 'User does not exist'});
    } else {
      request.user = await User.findById(decodedToken.id);
    }
  }

  next();
}


const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(404).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  }  else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}