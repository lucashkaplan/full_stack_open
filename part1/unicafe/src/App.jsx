import { useState } from 'react'

// component to create a button w/ onClickFxn as event handler for onClick event
const Button = ({name, onClickFxn}) => {
  return (
    <button onClick={onClickFxn}>{name}</button>
  )
}

// render single statistic line
const StatisticLine = ({text, value}) => (
  <tr>
    <td> {text} </td>
    <td> {value} </td>
  </tr>
)

// comp to render statistics
const Stastitics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  
  // only show stastics if there are any reviews
  if(total === 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average Score" value={((good - bad)/total).toFixed(2)} />
          <StatisticLine text="Percent Positive" value={(good/total * 100).toFixed(2) + "%"} />
        </tbody>
      </table>
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