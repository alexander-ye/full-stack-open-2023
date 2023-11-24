const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    return response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (!blog) response.status(404).end();
    response.json(blog);
  } catch (exception) {
    logger.error(exception);
    response.status(400).send({ error: 'something went wrong' });
  }
});

blogsRouter.post('/', async (request, response) => {
  try {
    const {body} = request;
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    });

    const newBlogPost = await blog.save();
    response.status(201).json(newBlogPost);
  } catch (error) {
    logger.error(error);
    response.status(400).send({ error: 'something went wrong' });
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const {body} = request;

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    };

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});

    response.json(updatedBlog);

  } catch (exception) {
    next(exception);
  }
})

module.exports = blogsRouter;