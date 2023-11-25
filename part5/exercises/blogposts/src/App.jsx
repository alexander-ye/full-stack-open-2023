import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      setNotification('User successfully logged in')
    }

    // return () => window.localStorage.removeItem('loggedNoteappUser')
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {notification !== null && <Notification notification={notification} setNotification={setNotification} />}
      {user === null 
        ? <LoginForm user={user} setUser={setUser} setNotification={setNotification} />
        : <>
          <p>{user.name} logged in</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null);
          }}>log out</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm blogs={blogs} setBlogs={setBlogs} setNotification={setNotification} />
        </>}
    </div>
  )
}

export default App

const LoginForm = ({setUser, setNotification}) => {
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  
  const handleLogin = async (event) => {
    // Backend expects token verifying user's identity to be sent in the Authorization header of note
    event.preventDefault()
    try {
      console.log('logging in with', username, password)
      const user = await loginService.login({
        username, password,
      })

      // Save the user to local storage
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      // On successful login
      // Set token for blogService
      blogService.setToken(user.token)
      // Empty form fields, save server response (token + user details) to application state
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('User successfully logged in')

    } catch (exception) {
      setNotification('Wrong credentials')
      console.error(exception);
    }
  }
  return  <form onSubmit={handleLogin}>
  <div>
    username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
  </div>
  <div>
    password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
    />
  </div>
  <button type="submit">login</button>
</form>
}

const BlogForm = ({blogs, setBlogs, setNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    blogService.create({title, author, url}).then(newBlog => {
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotification('Blog successfully created')
    }).catch((error) => {
      setNotification('Error creating blog')
      console.error(error);
    })
  }

  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="title">Title</label>
      <input id="title" type="text" value={title} onChange={({target}) => setTitle(target.value)} />
    </div>
    <div>
      <label htmlFor="author">Author</label>
      <input id="author" type="text" value={author} onChange={({target}) => setAuthor(target.value)} />
    </div>
    <div>   
      <label htmlFor="url">URL</label>
      <input id="url" type="text" value={url} onChange={({target}) => setUrl(target.value)} />
    </div>    
    <button type="submit">Create</button>
    </form>
}

const Notification = ({notification, setNotification}) => {

  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    } , 5000)
  }, [])

  return <p>{notification}</p>
}