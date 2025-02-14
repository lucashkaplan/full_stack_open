import { useState } from 'react'

// component to create a button w/ onClickFxn as event handler for onClick event
const Button = ({name, onClickFxn}) => {
  return (
    <button onClick={onClickFxn}>{name}</button>
  )
}

// comp to render statistics
const Stastitics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return(
    <div>
      <h1>Statistics</h1>
      <p>
        <li>Good: {good} </li>
        <li>Neutral: {neutral} </li>
        <li>Bad: {bad}</li>
        <li>All: {total}</li>
        <li>Average Score: {good - bad}</li>
        <li>Percent Positive: {(good/total * 100).toFixed(2)}%</li>
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // handler for each button
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button name="good" onClickFxn={handleGoodClick} />
      <Button name="neutral" onClickFxn={handleNeutralClick} />
      <Button name="bad" onClickFxn={handleBadClick} />
      <Stastitics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App