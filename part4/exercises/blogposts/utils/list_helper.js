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

const mostBlogs = (blogs) => {
  let maxCount = 0;
  let maxAuthor = null;
  const authors = blogs.reduce((authorBlogCount, blog) => {
    if (blog.author in authorBlogCount) {
      authorBlogCount[blog.author].blogs += 1
    } else {
      authorBlogCount[blog.author] = {
        author: blog.author,
        blogs: 1
      }
    }
    if (authorBlogCount[blog.author].blogs > maxCount) {
      maxCount = authorBlogCount[blog.author].blogs;
      maxAuthor = blog.author
    }
    return authorBlogCount;
  }, {});

  return authors[maxAuthor]
}

const mostLikes = (blogs) => {
  let maxCount = 0;
  let maxAuthor = null;
  const authors = blogs.reduce((authorLikeCount, blog) => {
    if (blog.author in authorLikeCount) {
      authorLikeCount[blog.author].likes += blog.likes
    } else {
      authorLikeCount[blog.author] = {
        author: blog.author,
        likes: blog.likes
      }
    }
    if (authorLikeCount[blog.author].likes > maxCount) {
      maxCount = authorLikeCount[blog.author].likes;
      maxAuthor = blog.author
    }
    return authorLikeCount;
  }, {});

  return authors[maxAuthor]
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}