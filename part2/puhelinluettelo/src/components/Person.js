import React from 'react'

const Person = (props) => (
  <div>
    <p>Nimi: {props.name}, Puhelinnumero: {props.num}</p>
  </div>
)

export default Person