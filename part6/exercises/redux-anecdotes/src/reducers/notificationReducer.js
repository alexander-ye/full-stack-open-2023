import { createSlice } from "@reduxjs/toolkit";

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducers: {
    notifyForAnecdote(state, action) {
      state.push(action.payload);
    },
    clearNotification(state, action) {
      state.shift();
    }
  }
})

export const showNotification = (anecdote, type, showFor = 5) => {
  const milliseconds = showFor * 1000
  return dispatch => {
    dispatch(notifyForAnecdote(anecdote, type))
    setTimeout(() => {
      dispatch(clearNotification())
    }, milliseconds)
  }
}

export const { notifyForAnecdote, clearNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;