const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    if (!blog.likes) return sum;
    return sum + blog.likes;
  }, 0);
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null;

  for (const blog of blogs) {
    if (!favoriteBlog || blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  }

  return favoriteBlog;
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}