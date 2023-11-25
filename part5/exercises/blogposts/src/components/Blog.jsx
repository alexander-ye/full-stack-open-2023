import Togglable from './Togglable';

function Blog({ blog, onLike, onDelete }) {
  return (
    <div style={blogStyle} className="blog">
      <div className="blogTitleAuthor">
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <Togglable buttonLabel="show details" cancelLabel="hide details">
        <div className="blogUrl">{blog.url}</div>
        <div className="blogLikes">
          likes
          {' '}
          {blog.likes}
          <button className="likeButton" onClick={() => onLike({ ...blog, likes: blog.likes + 1 })}>like</button>
        </div>
        <div className="blogUserName">{blog.user.name}</div>
        <button className="blogDeleteButton" onClick={() => onDelete(blog)}>delete</button>
      </Togglable>
    </div>
  );
}

export default Blog;

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
};
