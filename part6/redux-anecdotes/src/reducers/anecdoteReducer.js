import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from '../services/anecdotes';
import { showNotification } from "./notificationReducer";

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    incrementVote(state, action) {
      const { id } = action.payload;
      return state.map(anecdote => anecdote.id === id ? action.payload : anecdote).sort((a, b) => (a.votes > b.votes) ? -1 : 1);
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

// With Redux Thunk it is possible to implement action creators which return a function instead of an object. 
// The function receives Redux store's dispatch and getState methods as parameters. 
// This allows for example implementations of asynchronous action creators, which first wait for the completion 
// of a certain asynchronous operation and after that dispatch some action, which changes the store's state.
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content);
    dispatch(appendAnecdote(newAnecdote))
    dispatch(showNotification(`you created ${newAnecdote.content}`))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(incrementVote(updatedAnecdote))
    dispatch(showNotification(`you voted ${updatedAnecdote.content}`))
  }
}

export const { incrementVote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;