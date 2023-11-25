import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((blogA, blogB) => blogB.likes - blogA.likes)));
  }, []);

  const createBlog = (blogObject) => {
    blogService.get(blogObject._id).then((blog) => {
      if (blog) {
        setBlogs(blogs.concat(blog));
      }
    });
    setNotification('Blog successfully created');
  };

  const likeBlog = (blogObject) => {
    blogService.update(blogObject._id, blogObject).then((blog) => {
      if (blog) {
        setBlogs(blogs.map((b) => (b._id === blog._id ? { ...b, likes: blog.likes } : b)).sort((blogA, blogB) => blogB.likes - blogA.likes));
      }
    });
  };

  const deleteBlog = (blogObject) => {
    if (confirm(`Delete blog ${blogObject.title} by ${blogObject.author}?`)) {
      blogService.deleteBlog(blogObject._id).then(() => {
        setBlogs(blogs.filter((blog) => blog._id !== blogObject._id));
      }).catch((error) => {
        console.error(error);
        setNotification('Blog could not be deleted');
      });
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      setNotification('User successfully logged in');
    }

    // return () => window.localStorage.removeItem('loggedNoteappUser')
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {notification !== null && <Notification notification={notification} setNotification={setNotification} />}
      {user === null
        ? <LoginForm user={user} setUser={setUser} setNotification={setNotification} />
        : (
          <>
            <p>
              {user.name}
              {' '}
              logged in
            </p>
            <button onClick={() => {
              window.localStorage.removeItem('loggedNoteappUser');
              setUser(null);
            }}
            >
              log out
            </button>
            <Togglable buttonLabel="Create new blog">
              <BlogForm createBlog={createBlog} setNotification={setNotification} />
            </Togglable>
          </>
        )}
      {blogs.map((blog) => <Blog
        key={blog._id}
        blog={blog}
        onLike={likeBlog}
        showDelete={user && user.username === blog.user.username}
        onDelete={deleteBlog} />)}
    </div>
  );
}

export default App;

function Notification({ notification, setNotification }) {
  useEffect(() => {
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  }, []);

  return <p>{notification}</p>;
}
