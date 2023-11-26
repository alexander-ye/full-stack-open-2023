import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import { NotificationContext } from '../contexts'

const AnecdoteForm = () => {
  const {notificationDispatch} = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote, 
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({type: 'ANECDOTE_CREATED'})
    }}) 

  const onCreate = (event) => {
    event.preventDefault()
    if (!event.target.anecdote.value.trim()) {
      notificationDispatch({type: 'ANECDOTE_CREATION_BLANK'})
      return
    }
    if (event.target.anecdote.value.length < 5) {
      notificationDispatch({type: 'ANECDOTE_CREATION_SHORT'})
      return
    }
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
