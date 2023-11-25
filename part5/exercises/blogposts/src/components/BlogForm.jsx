import { useState } from 'react'
import blogService from '../services/blogs'

function BlogForm({ createBlog, setNotification }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    blogService.create({ title, author, url }).then((newBlog) => {
      createBlog(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
    }).catch((error) => {
      setNotification('Error creating blog')
      console.error(error)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" placeholder="title" value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input id="author" type="text" placeholder="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor="url">URL</label>
        <input id="url" type="text"placeholder="url" value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button className="createNewBlogButton" type="submit">Create</button>
    </form>
  )
}

export default BlogForm
