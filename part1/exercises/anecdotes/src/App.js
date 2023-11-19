import React, { useState } from 'react'

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 }
  ])

  const [maxVotes, setMaxVotes] = useState(0)
  const [selected, setSelected] = useState(Math.floor(Math.random() * 7))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={() => {
        const votes = anecdotes[selected].votes + 1
        if (votes > maxVotes) {
          setMaxVotes(votes)
        }
        setAnecdotes([...anecdotes].map((anecdote, index) => {
          if (index === selected) {
            return ({ ...anecdote, votes })

          }
          return anecdote
        }))
      }}
      >
        vote
      </button>
      <button onClick={() => {
        let nextIndex = Math.floor(Math.random() * 7);
        while (nextIndex === selected) {
          nextIndex = Math.floor(Math.random() * 7);
        }
        setSelected(nextIndex)
      }}
      >
        next anecdote
      </button>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes.find(anecdote => anecdote.votes === maxVotes).text} has {anecdotes.find(anecdote => anecdote.votes === maxVotes).votes} votes</p>
    </div>
  )
}

export default App