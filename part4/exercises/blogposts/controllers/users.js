const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');


usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1 })

  response.status(200).json(users)
})

usersRouter.post('/', async (request, response) => {
  const {username, name, password} = request.body;

  if (!username || !password) {
    return response.status(400).json({ error: 'username or password missing' });
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' });
  }
  if (password.length < 3) { 
    return response.status(400).json({ error: 'password must be at least 3 characters long' });
  }

  if (typeof username !== 'string' || typeof password !== 'string' || typeof name !== 'string') {
    return response.status(400).json({ error: 'invalid user inputs' });
  }

  const saltRounds = 10; // ???
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash
  })
  
  const savedUser = await user.save(); 
  response.status(201).json(savedUser);
})

module.exports = usersRouter;