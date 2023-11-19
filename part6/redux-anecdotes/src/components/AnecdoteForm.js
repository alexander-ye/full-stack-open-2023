import React from "react";
import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  // Reminder: useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js
  const dispatch = useDispatch();

  const addAnecdote = async (ev) => {
    ev.preventDefault();
    const content = ev.target.anecdote.value
    if (content.trim().length) {
      ev.target.anecdote.value = '';
      dispatch(createNewAnecdote(content))
    }
  }

  return <form onSubmit={addAnecdote} >
    <h2>Create New</h2>
    <div><input name="anecdote" /></div>
    <button>create new</button>
  </form>
}

export default AnecdoteForm;