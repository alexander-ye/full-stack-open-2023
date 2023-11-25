import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null);

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
    }

    return () => window.localStorage.removeItem('loggedNoteappUser')
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      
      {user === null 
        ? <LoginForm user={user} setUser={setUser} />
        : <>
          <p>{user.name} logged in</p>
          <button onClick={() => {
            window.localStorage.removeItem('loggedNoteappUser')
            setUser(null);
          }}>log out</button>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
      )}
        </>}
    </div>
  )
}

export default App

const LoginForm = ({setUser}) => {
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
      // Empty form fields, save server response (token + user details) to application state
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
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