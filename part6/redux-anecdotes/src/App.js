import React from 'react';
import AnecdotesList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = (props) => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList store={props.store} />
      <AnecdoteForm store={props.store} />
    </div>
  )
}

export default App
