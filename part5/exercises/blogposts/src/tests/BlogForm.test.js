import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'
import LoginForm from '../components/LoginForm'

beforeEach(() => {
  // login
})

test('BlogForm calls event handler it received as props with right details when new blog is created', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const formContainer = render(<BlogForm createBlog={createBlog} setNotification={() => null} />).container

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const sendButton = formContainer.querySelector('.createNewBlogButton')

  await user.type(titleInput, 'Hello There')
  await user.type(authorInput, 'General Kenobi')
  await user.type(urlInput, 'https://www.youtube.com/watch?v=rEq1Z0bjdwc')
  await user.click(sendButton)

  // Ensure submitting form calls createBlog
  expect(createBlog.mock.calls).toHaveLength(1)
  // Check event handler is called with the correct parameters
  expect(createBlog.mock.calls[0][0].title).toBe('Hello There')
  expect(createBlog.mock.calls[0][0].author).toBe('General Kenobi')
  expect(createBlog.mock.calls[0][0].url).toBe('https://www.youtube.com/watch?v=rEq1Z0bjdwc')
})

afterAll(() => {
  // logout
})