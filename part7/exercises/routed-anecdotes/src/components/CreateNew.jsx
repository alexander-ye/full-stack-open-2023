import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = (props) => {
  const navigate = useNavigate()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.props.value.trim()) return;
    if (content.props.value.length < 5) return;
    props.addNew({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0
    })
    navigate('/')
  }

  const reset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.props} />
        </div>
        <div>
          author
          <input name='author' {...author.props} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.props} />
        </div>
        <button>create</button>
        <button type="button" onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew;