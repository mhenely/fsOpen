import { useState } from 'react'


const Button = ({ text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisitcLine = ({text, value}) => {
  return (
    <div>
      {text}: {value}
    </div>
  )
}

const Statisitcs = ({ good, bad, neutral }) => {

  const all = good + bad + neutral
  
  return (
    <div>
      <StatisitcLine text='good' value={good} />
      <StatisitcLine text='neutral' value={neutral} />
      <StatisitcLine text='bad' value={bad} />
      <StatisitcLine text='all' value={all} />
      <StatisitcLine text='average' value={(good - bad )/ all} />
      <StatisitcLine text='positive' value={good / all} />
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={()=> setGood(good + 1)} text={'good'}/>
      <Button onClick={()=> setNeutral(neutral + 1)} text={'neutral'}/>
      <Button onClick={()=> setBad(bad + 1)} text={'bad'}/>
      <h2>statistics</h2>
      {
        good + neutral + bad > 0 ? 
        <Statisitcs good={good} neutral={neutral} bad={bad} />
        : 'No feedback given'
      }
    </div>
  )
}

export default App