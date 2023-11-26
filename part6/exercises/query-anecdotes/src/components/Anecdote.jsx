import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'

const Anecdote = ({anecdote}) => {
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  return  <div key={anecdote.id}>
  <div>
    {anecdote.content}
  </div>
  <div>
    has {anecdote.votes}
    <button onClick={() => handleVote(anecdote)}>vote</button>
  </div>
</div>
}

export default Anecdote;