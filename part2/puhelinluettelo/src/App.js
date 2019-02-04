import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [shownPersons, setShownPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    updateAllPersons()
  }, [])

  const updateAllPersons = () => {
    personService
      .getAllPersons()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
        setShownPersons(fetchedPersons)
      }).catch(err => console.log(err))
  }

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

  const deletePerson = person => () => {
    if (!window.confirm(`Poistetaanko ${person.name}?`)) {
      return
    }
    personService
      .deletePerson(person.id)
      .then(() => updateAllPersons())
      .catch(err => console.log(err))
  }

  const addNewPerson = (e) => {
    e.preventDefault()
    if (persons.find(p => p.name === newName)) {
      if (!window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        return
      }
      const personId = persons.find(p => p.name === newName).id
      personService
        .updatePerson({ name: newName, number: newNumber, id: personId })
        .then(person => {
          console.log(`updated ${person.name}`)
          updateAllPersons()
        })
        .catch(err => console.log(err))
      return
    }
    const newPerson = { name: newName, number: newNumber }
    personService
      .addNewPerson(newPerson)
      .then(adedPerson => {
        const newPersons = persons.concat(adedPerson)
        setPersons(newPersons)
        setShownPersons(newPersons)
      })
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
        {shownPersons.map(p => <Person key={p.id} name={p.name} num={p.number} deleteHandler={deletePerson(p)} />)}
      </div>
    </div>
  )

}

export default App
