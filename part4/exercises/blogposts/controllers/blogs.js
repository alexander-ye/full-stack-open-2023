const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');
const middleware = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1});
    return response.json(blogs);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1});;
    if (!blog) response.status(404).end();
    response.json(blog);
  } catch (exception) {
    logger.error(exception);
    response.status(400).send({ error: 'something went wrong' });
  }
});

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  try {
    const { body } = request;

    const user = request.user;

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id
    });

    const newBlogPost = await blog.save()
    response.status(201).json(newBlogPost);
  } catch (error) {
    logger.error(error);
    response.status(400).send({ error: 'something went wrong' });
  }
});

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (blog?.user?.toString?.() !== user.id.toString() && !blog?.user?.id?.toString?.() !== user.id.toString()) { 
      return response.status(401).json({ error: 'user not authorized to delete this blog post' });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const {body} = request;
    console.log(body.user);

    const blog = {
      user: body.user.id,
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