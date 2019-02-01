import React from 'react'

const AddPersonForm = (props) => (
  <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={props.submitHandler}>
      <div>
        nimi: <input value={props.nameValue} onChange={props.nameHandler} />
      </div>
      <div>
        numero: <input value={props.numValue} onChange={props.numHandler} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </div>
)

export default AddPersonForm