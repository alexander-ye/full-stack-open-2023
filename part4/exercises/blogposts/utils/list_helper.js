const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    if (!blog.likes) return sum;
    return sum + blog.likes;
  }, 0);
}



module.exports = {
  dummy,
  totalLikes
}