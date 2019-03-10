import React from 'react'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const createNote = (e) => {
    e.preventDefault()
    props.store.dispatch(addAnecdote({ content: e.target.newAnecdoteContent.value }))
    e.target.newAnecdoteContent.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <input type="text" name="newAnecdoteContent" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm