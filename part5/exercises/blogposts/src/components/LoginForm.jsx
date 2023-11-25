import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

function LoginForm({ setUser, setNotification }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    // Backend expects token verifying user's identity to be sent in the Authorization header of note
    event.preventDefault()
    try {
      console.log('logging in with', username, password)
      const user = await loginService.login({
        username,
        password,
      })

      // Save the user to local storage
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      // On successful login
      // Set token for blogService
      blogService.setToken(user.token)
      // Empty form fields, save server response (token + user details) to application state
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification('User successfully logged in')
    } catch (exception) {
      setNotification('Wrong credentials')
      console.error(exception)
    }
  }
  return (
    <form onSubmit={handleLogin}>
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
  )
}

export default LoginForm
