// If the tests need to be able to modify the server's database, 
// he situation immediately becomes more complicated. 
// Ideally, the server's database should be the same each time we run the tests, 
// so our tests can be reliably and easily repeatable.

// As with unit and integration tests, with E2E tests 
// it is best to empty the database and possibly format it before the tests are run. 
// The challenge with E2E tests is that they do not have access to the database.

// The solution is to create API endpoints for the backend tests. 
// We can empty the database using these endpoints. 

const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter