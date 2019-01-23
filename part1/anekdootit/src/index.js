import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, clickHandler }) => (
  <div>
    <button onClick={clickHandler}>{text}</button>
  </div>
)

const Anecdote = ({ text, votes }) => (
  <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
  </div>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotesIndex, setMostVotesIndex] = useState(0)

  const randomAnecdote = () => {
    let i = selected;
    while (i === selected) {
      i = Math.floor(Math.random() * props.anecdotes.length);
    }
    setSelected(i);
  }

  const voteSelected = () => {
    let cpy = { ...votes }
    cpy[selected] = cpy[selected] + 1
    setVotes(cpy)
    if (cpy[selected] > mostVotes) {
      setMostVotes(cpy[selected])
      setMostVotesIndex(selected)
    }
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={props.anecdotes[selected]} votes={votes[selected]} />
      <Button text='Next anecdote!' clickHandler={randomAnecdote} />
      <Button text="Vote" clickHandler={voteSelected} />
      <h2>Anecdote with most votes</h2>
      <Anecdote text={props.anecdotes[mostVotesIndex]} votes={votes[mostVotesIndex]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)