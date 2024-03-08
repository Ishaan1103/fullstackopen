import { useState } from "react";
const Button = ({ handleClick, text }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}
const Display = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}
const StatisticLine =({text,value})=>{
  return(
    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}
const Statistics=(props)=>{
  const sum = props.good+props.neutral+props.bad;
  if(sum === 0){
    return(
      <p>
      No feedback given
      </p>
    )
  }
  return(
  <table>
    <tbody>
    <StatisticLine text="good" value = {props.good}/>
    <StatisticLine text="neutral" value = {props.neutral}/>
    <StatisticLine text="bad" value = {props.bad}/>
    <StatisticLine text="all" value = {sum}/>
    <StatisticLine text='average' value={(props.good * 1 + props.neutral * 0 + props.bad * (-1))/sum} />
    <StatisticLine text='positive' value={`${(props.good / sum) * 100 } %`}/>
    </tbody>
  </table>
)
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setValueOfGood = (good) => () => {
    setGood(good + 1);
  }
  const setValueOfNeutral = (neutral) => () => {
    setNeutral(neutral + 1);
  }
  const setValueOfbad = (bad) => () => {
    setBad(bad + 1);
  }
  return (
    <div>
      <Display name='give feedback' />
      <Button handleClick={setValueOfGood(good)} text='good' />
      <Button handleClick={setValueOfNeutral(neutral)} text='neutral' />
      <Button handleClick={setValueOfbad(bad)} text='bad' />
      <Display name='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
};
export default App;