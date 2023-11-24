require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

// I was too lazy to create a separate test database, so I just used the same one
// const MONGODB_URI = process.env.NODE_ENV === 'test' 
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI


module.exports = {
  MONGODB_URI,
  PORT
}