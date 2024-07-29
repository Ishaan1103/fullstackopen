const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const notification = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginRottom: 10
  }
  return(
    <div style={message.type === 'error'?error:notification}>
      {message.text}
    </div>
  )
}
export default Notification