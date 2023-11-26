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
    if (!event.target.anecdote.value.trim()) return
    if (event.target.anecdote.value.length < 5) return alert('anecdote must be at least 5 characters long')
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
