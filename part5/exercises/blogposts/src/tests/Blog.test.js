import Blog from '../components/Blog'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

let container

beforeEach(() => {
  // Render Togglable component
  container = render(
    <Blog
      blog={{
        title: 'You are on this council, but we do not grant you the rank of master',
        author: 'Anakin Skywalker',
        likes: 0,
        url: 'unfair',
        user: {
          username: 'Anakin Skywalker',
          name: 'anakin',
          id: '60f9b4c5e4f9a4c0c4f8f1f2'
        }
      }}
    />
  ).container
})


test('check blog URL and number of likes are shown when button controllling shown details has been clicked', () => {
  const blogElement = container.querySelector('.blog')

  const titleAuthor = container.querySelector('.blogTitleAuthor')
  expect(titleAuthor).toHaveTextContent('You are on this council, but we do not grant you the rank of master')
  expect(titleAuthor).toHaveTextContent('Anakin Skywalker')

  const togglableContent = container.querySelector('.showWhenVisible')
  expect(togglableContent).toHaveStyle('display: none')

  const button = container.querySelector('.showButton')
  fireEvent.click(button)

  expect(togglableContent).toHaveStyle('display: block')
  expect(togglableContent).toHaveTextContent('unfair')
  expect(togglableContent).toHaveTextContent('0')
  expect(togglableContent).toHaveTextContent('likes')
})

test('if like button is clicked twice, event handler is called twice', () => {

})