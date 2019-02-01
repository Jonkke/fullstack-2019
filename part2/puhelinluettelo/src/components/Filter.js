import React from 'react'

const Filter = (props) => (
  <div>
    <h3>Filtteröi tuloksia</h3>
    Rajaa näytettäviä:
      <input type="text" value={props.text} onChange={props.handler} />
  </div>
)

export default Filter