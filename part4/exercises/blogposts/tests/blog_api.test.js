const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const blogs = require('./dummy_data').dummyBlogs;

beforeEach(async () => {
  // Reset the database before each test
  await Blog.deleteMany({});

  // Save blogs stored in dummy data initial blogs array to database
  await Blog.insertMany(blogs);
});

describe('fetching blogs', () => {
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

  test('can fetch specific blog with valid id', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToView = blogsAtStart[0];
  
    const response = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
  
    const fetchedBlog = response.body;

    expect(fetchedBlog._id).toEqual(blogToView.id);
    expect(fetchedBlog.title).toEqual(blogToView.title);
    expect(fetchedBlog.author).toEqual(blogToView.author);
    expect(fetchedBlog.url).toEqual(blogToView.url);
    expect(fetchedBlog.likes).toEqual(blogToView.likes);
  });

  test('fetching a blog with an invalid id throws error', async () =>{
    const invalidId = 'starwars'
    response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })
})


describe('creating blog posts', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: "General Kenobi",
      author: "General Grievous",
      url: "/hello-there",
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogs.length + 1);
  
    const blogContents = blogsAtEnd.map(({title, author}) => {
      return {title, author}});
    expect(blogContents).toContainEqual({title: newBlog.title, author: newBlog.author});
  });
  
  test('blog without title is not added', async () => {
    const newBlog = {
      author: "Anakin Skywalker",
      url: "/anakin",
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
  });
  
  test('blog without url is not added', async () => {
    const newBlog = {
      title: "The Chosen One",
      author: "Anakin Skywalker",
      likes: 1
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400);
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

  test('new post with missing likes field defaults to 0', async () => {
    const newBlog = {
      title: "Yoda",
      author: "My name is",
      url: "/dagobah"
    }
  
    const storedBlog = await api
      .post('/api/blogs')
      .send(newBlog)
  
    expect(storedBlog?._body?._id).toBeDefined();
    const newBlogId = storedBlog._body._id;
  
    const returnedBlog = await Blog.find({_id: newBlogId});
  
    expect(returnedBlog).toHaveLength(1);
    expect(returnedBlog[0].likes).toBe(0);
  })

  test('blogs have unique identifiers named id', async () => {
    const blogs = await Blog.find({});
  
    const blogIds = blogs.map(({id}) => {
      expect(id).toBeDefined();
      return id
    });
    expect([...new Set(blogIds)]).toHaveLength(blogs.length);
  });
})

describe('updating blog posts', () => {
  test('can update blog likes', async () => {
    const blogsAtStart = await Blog.find({});
    const blogToUpdate = blogsAtStart[0];
  
    const updatedBlog = {
      ...blogToUpdate._doc,
      likes: blogToUpdate.likes + 1
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);
    
    const blogsAtEnd = await Blog.find({});
    expect(blogsAtEnd).toHaveLength(blogs.length);
  
    const blogContents = blogsAtEnd.map(({title, author, likes}) => {
      return {title, author, likes}});
    expect(blogContents).toContainEqual({title: updatedBlog.title, author: updatedBlog.author, likes: updatedBlog.likes});
  })
})


describe('deleting blog posts', () => {
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
  });
})


afterAll(async () => {
  await mongoose.connection.close();
});