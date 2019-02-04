import React from 'react'

const Notification = (props) => {
  const notificationStyle = {
    position: 'absolute',
    border: '3px solid',
    background: props.isBad ? '#ffacac' : '#adefcf',
    borderColor: props.isBad ? '#ff5555' : '#77cc88',
    borderRadius: '5px',
    width: '400px',
    height: '65px',
    top: '100px',
    left: '50%',
    marginLeft: '-200px',
    textAlign: 'center'
  }
  const notificationTextStyle = {
    fontSize: '20px',
    fontWeight: 'bold'
  }

  return (
    <div style={notificationStyle}>
      <p style={notificationTextStyle}>{props.msg}</p>
    </div>
  )
}

export default Notification