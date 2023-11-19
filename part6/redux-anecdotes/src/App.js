import React, { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import SearchFilterForm from './components/FilterForm';
import Notification from './components/Notification';
import { useDispatch } from 'react-redux';
import { initializeAnecdotes } from './reducers/anecdoteReducer';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h2>Anecdotes</h2>
      <SearchFilterForm />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App