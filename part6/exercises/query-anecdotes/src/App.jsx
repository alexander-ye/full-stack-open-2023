import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './requests'
import Anecdote from './components/Anecdote'
import { useReducer } from 'react'
import { NotificationContext } from './contexts'

const App = () => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (anecdotes.isError || anecdotes.isLoadingError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if (anecdotes.isLoading) {
    return <div>loading data...</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContext.Provider value={{notificationDispatch: notificationDispatch}}>
        <Notification message={notification} />
        <AnecdoteForm />
      
        {anecdotes.data.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}
    </NotificationContext.Provider>
    </div>
  )
}

export default App

const notificationReducer = (state='', action) => {
  const anecdote = action?.anecdote
  switch (action.type) {
    case 'CLEAR_NOTIFICATION':
      return ''
    case 'ANECDOTE_CREATED':
      return 'Anecdote successfully created'
    case 'ANECDOTE_CREATION_BLANK':
      return 'Anecdote cannot be blank'
    case 'ANECDOTE_CREATION_SHORT':
      return 'Anecdote must be at least 5 characters long'
    case 'ANECDOTE_CREATION_ERROR':
      return 'Anecdote creation failed'
    case 'ANECDOTE_VOTED': 
      return `anecdote ${anecdote} voted`
    case 'ANECDOTE_VOTE_ERROR':
      return 'Voting failed'
    default: 
      return state;
  }
}