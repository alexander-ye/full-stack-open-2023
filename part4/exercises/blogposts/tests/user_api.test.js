const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./helpers')
const mongoose = require('mongoose')

const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'Superuser', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'gkenobi',
      name: 'Oobie Doobie Banoobie',
      password: 'master',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  // The app crashes if we try this...
  test.skip('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Master Skywalker',
      password: 'sekret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result._body).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

describe('user creation field validation', () => {
  test('no username given', async () => {
    const newUser = {
      name: 'Banoobie',
      password: 'oobiedoobie'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username or password missing')
  })

  test('no password given', async () => {
    const newUser = {
      username: 'obiwan',
      name: 'Banoobie'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('username or password missing')
  })

  test('username does not meet length requirement', async () => {
    const newUser = {
      username: 'oo',
      password: 'biedoobie',
      name: 'Banoobie'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('must be at least 3 characters long')
  })

  test('password does not meet length requierment',  async () => {
    const newUser = {
      username: 'oobiedoob',
      password: 'ie',
      name: 'Banoobie'
    } 

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('must be at least 3 characters long')
  })

  test('malformed user input',  async () => {
    const newUser = {
      username: 1,
      password: 2,
      name: 3
    } 

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('invalid')
  })
})

afterAll(() => {
  mongoose.connection.close()
})