import PropTypes from 'prop-types'
import { useState,forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef((props,refs) => {
  const [visible,setVisible]=useState(false)

  const handleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs,() => {
    return(
      { handleVisible }
    )
  })

  const hideWhenVisible = { display:visible?'none':'' }
  const showWhenVisible = { display:visible?'':'none' }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={handleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleVisible}>cancle</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes={
  buttonLabel:PropTypes.string.isRequired
}

export default Togglable