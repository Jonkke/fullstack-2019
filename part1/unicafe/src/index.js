import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
)

const Statistic = ({ label, value }) => (
  <div>
    <p>{label}: {value}</p>
  </div>
)

const Statistics = props => {
  if (props.total > 0) {
    return (
      <div>
        {props.votes.map((s, i) => <Statistic key={i} label={s.name} value={s.value} />)}
        <Statistic label='Yhteensä' value={props.total} />
        <Statistic label='Keskiarvo' value={props.avg} />
        <Statistic label='Positiivisia' value={Math.round(props.pp * 100) + ' %'} />
      </div>
    )
  }
  return (
    <div>
      <p>Palautetta ei ole annettu! Paina palautenappeja jotta näet statistiikan.</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [avgValues, setAvgValues] = useState(0);
  const [avg, setAvg] = useState(0);
  const [percentPositive, setPP] = useState(0);

  const handleVoteClick = vote => () => {
    const newTotal = total + 1;
    let newGood = good;
    let newAvgValues = avgValues;
    setTotal(newTotal);
    if (vote === 1) {
      newGood++;
      setGood(newGood);
      newAvgValues++;
    } else if (vote === 0) {
      setNeutral(neutral + 1);
    } else if (vote === -1) {
      setBad(bad + 1)
      newAvgValues--;
    }
    setAvgValues(newAvgValues);
    setAvg(newAvgValues / newTotal);
    setPP(newGood / newTotal);
  }

  return (
    <div>
      <h3>Anna palautetta:</h3>
      <Button text='Hyvä' clickHandler={handleVoteClick(1)} />
      <Button text='Neutraali' clickHandler={handleVoteClick(0)} />
      <Button text='Huono' clickHandler={handleVoteClick(-1)} />
      <h3>Statistiikka</h3>
      <Statistics votes={[{
        name: 'Hyvä',
        value: good
      }, {
        name: 'Neutraali',
        value: neutral
      }, {
        name: 'Huono',
        value: bad
      }]} total={total} avg={avg} pp={percentPositive} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));