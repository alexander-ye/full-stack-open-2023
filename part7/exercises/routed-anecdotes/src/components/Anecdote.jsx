import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes=[] }) => {
  const id = useParams().id
  const anecdote = anecdotes?.find?.(a => a.id === Number(id))

  if (!anecdotes) return <div><h2>Anecdote not founc</h2></div>

  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has {anecdote.votes} votes</p>
    </div>
  )
}

export default Anecdote;