import React from 'react'

const Notification = ({ message, isError }) => {
  if (message) {
    return (
      <div className={"Notification" + isError ? 'isError' : ''} >{message}</div>
    )
  }
  return ('')
}

export default Notification