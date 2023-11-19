import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteForAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.search?.trim() === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(({ content }) => content.toLowerCase().includes(state.search))
  })
  // Reminder: useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote))
  }

  return <>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            vote(anecdote)
          }}>vote</button>
        </div>
      </div>
    )}</>
}

export default AnecdoteList;