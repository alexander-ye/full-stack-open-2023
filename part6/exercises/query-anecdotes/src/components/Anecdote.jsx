import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useContext } from 'react'
import { NotificationContext } from '../contexts'

const Anecdote = ({anecdote}) => {
  const {notificationDispatch} = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote))
      notificationDispatch({type: 'ANECDOTE_VOTED', anecdote: updatedAnecdote.content})
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