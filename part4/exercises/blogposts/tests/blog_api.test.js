const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const listWithOneBlog = require('./dummy_data').dummyListWithOneBlog;
const blogs = require('./dummy_data').dummyBlogs;

beforeEach(async () => {
  // Reset the database before each test
  await Blog.deleteMany({});

  // Save blogs stored in dummy data initial blogs array to database
  const blogObjects = blogs.map(blog => new Blog(blog));
  const promises = blogObjects.map(blog => blog.save());
  await Promise.all(promises);
});

afterAll(async () => {
  await mongoose.connection.close();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(blogs.length);
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "General Kenobi",
    author: "General Grievous",
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  
  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(blogs.length + 1);

  const blogContents = blogsAtEnd.map(({title, author}) => {
    return {title, author}});
  expect(blogContents).toContainEqual({title: newBlog.title, author: newBlog.author});
});

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: "Anakin Skywalker",
    likes: 1
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('can delete blog', async () => {
  const blogsAtStart = await Blog.find({});
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);
  
  const blogsAtEnd = await Blog.find({});
  expect(blogsAtEnd).toHaveLength(blogs.length - 1);

  const blogContents = blogsAtEnd.map(({title, author}) => {
    return {title, author}});
  expect(blogContents).not.toContainEqual({title: blogToDelete.title, author: blogToDelete.author});
})