import React from 'react'

const Person = (props) => (
  <div>
    <p>Nimi: {props.name}, Puhelinnumero: {props.num} <button onClick={props.deleteHandler}>poista</button></p>
  </div>
)

export default Person