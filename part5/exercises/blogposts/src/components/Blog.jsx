import Togglable from './Togglable';

function Blog({ blog, onLike, onDelete }) {
  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        {' '}
        {blog.author}
      </div>
      <Togglable buttonLabel="show details" cancelLabel="hide details">
        <div>{blog.url}</div>
        <div>
          likes
          {' '}
          {blog.likes}
          <button onClick={() => onLike({ ...blog, likes: blog.likes + 1 })}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <button onClick={() => onDelete(blog)}>delete</button>
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
