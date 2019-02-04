import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
  return axios
    .get(baseUrl)
    .then(res => res.data)
}

const addNewPerson = person => {
  return axios
    .post(baseUrl, person)
    .then(res => res.data)
}

const deletePerson = id => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then(res => res.data)
}

const updatePerson = person => {
  return axios
    .put(`${baseUrl}/${person.id}`, person)
    .then(res => res.data)
}

export default {
  getAllPersons,
  addNewPerson,
  deletePerson,
  updatePerson
}