import React, { useState } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Martti Tienari', number: '040-123456', id: 1 },
    { name: 'Arto Järvinen', number: '040-123456', id: 2 },
    { name: 'Lea Kutvonen', number: '040-123456', id: 3 }
  ])
  const [shownPersons, setShownPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const updateFilterField = (e) => {
    const filterText = e.target.value
    setNewFilter(filterText)
    updateShownPersons(filterText)
  }

  const updateNameField = (e) => {
    setNewName(e.target.value)
  }

  const updateNumberField = (e) => {
    setNewNumber(e.target.value)
  }

  const addNewPerson = (e) => {
    e.preventDefault()
    if (persons.find(p => p.name === newName)) {
      alert(`${newName} on jo luettelossa!`)
      return
    }
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
    const newPersons = persons.concat(newPerson)
    setPersons(newPersons)
    setShownPersons(newPersons)
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const updateShownPersons = (filterText) => {
    const filteredPersons = persons.filter(p => {
      return p.name.toLowerCase().includes(filterText.trim().toLowerCase())
    })
    setShownPersons(filteredPersons)
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter text={newFilter} handler={updateFilterField} />
      <AddPersonForm
        submitHandler={addNewPerson}
        nameValue={newName}
        nameHandler={updateNameField}
        numValue={newNumber}
        numHandler={updateNumberField}
      />
      <h2>Numerot</h2>
      <div>
        {shownPersons.map(p => <Person key={p.id} name={p.name} num={p.number} />)}
      </div>
    </div>
  )

}

export default App
