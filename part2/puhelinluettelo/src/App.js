import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [shownPersons, setShownPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMsg, setNotificationMsg] = useState({})
  const [notificationVisible, setNotificationVisible] = useState(false)

  useEffect(() => {
    updateAllPersons()
  }, [])

  useEffect(() => {
    if (!notificationMsg.msg) return
    setNotificationVisible(true)
    setTimeout(() => {
      setNotificationVisible(false)
    }, 4000)
  }, [notificationMsg])

  const updateAllPersons = () => {
    personService
      .getAllPersons()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
        setShownPersons(fetchedPersons)
      }).catch(() => {
        setNotificationMsg({msg: `Henkilöiden haussa tapahtui virhe!`, isBad: true})
      })
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
      .then(() => {
        updateAllPersons()
        setNotificationMsg({msg: `Poistettiin henkilö ${person.name}`, isBad: false})
      })
      .catch(() => {
        setNotificationMsg({msg: `Henkilön poisto epäonnistui!`, isBad: true})
      })
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
         setNotificationMsg({msg: `Päivitettiin henkilön ${person.name} tiedot.`})
          updateAllPersons()
        })
        .catch(() => {
          setNotificationMsg({msg: `Henkilön päivitys epäonnistui!`, isBad: true})
        })
      return
    }
    const newPerson = { name: newName, number: newNumber }
    personService
      .addNewPerson(newPerson)
      .then(addedPerson => {
        const newPersons = persons.concat(addedPerson)
        setPersons(newPersons)
        setShownPersons(newPersons)
        setNotificationMsg({msg: `Lisättiin henkilö ${addedPerson.name}`})
      }).catch(() => {
        setNotificationMsg({msg: `Henkilön lisäys epäonnistui!`, isBad: true})
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
      {notificationVisible ? <Notification msg={notificationMsg.msg} isBad={notificationMsg.isBad} /> : null}
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
