const listHelper = require('../utils/list_helper');
const listWithOneBlog = require('./dummy_data').dummyListWithOneBlog;
const blogs = require('./dummy_data').dummyBlogs;

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});


describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has several blogs, equals the likes of the sum of all blogs in list', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });

  test('when list contains only blogs with 0 likes, return 0', () => {
    const result = listHelper.totalLikes([{ likes: 0 }, { likes: 0 }, { likes: 0 }]);
    expect(result).toBe(0);
  });

  test('when list is empty, return 0', () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe('favorite blog', () => {
  test('when list has only one blog, return that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test('when list is empty, return null', () => {
    const result = listHelper.favoriteBlog([]);
    expect(result).toBe(null);
  });

  test('when list has several blogs, return the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });
})