import { useState } from 'react'

// component to create a button w/ onClickFxn as event handler for onClick event
const Button = ({name, onClickFxn}) => {
  return (
    <button onClick={onClickFxn}>{name}</button>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // button handlers
  // generates random number w/in anecdotes array length
  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  // get anecdote with most votes
  const maxVotes = Math.max(...votes)
  const maxVotesIndex = votes.indexOf(maxVotes)

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {votes[selected]} votes.</p>
      <h1>Anecdote with Most Votes</h1>
      <p>{maxVotes === 0 ? "No votes have been cast yet." : anecdotes[maxVotesIndex]}</p>
      <Button name="Vote" onClickFxn={handleVoteClick} />
      <Button name="Next Anecdote" onClickFxn={handleAnecdoteClick} />
    </div>
  )
}

export default App