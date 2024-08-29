import AnecdoteForm from './components/AnecdoteForm.jsx'
import AnecdoteList from './components/AnecdoteList.jsx'
import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialzeAnecdote } from './reducers/anecdoteReducer.js'

const App = () => {
  const dispatch =useDispatch()
  useEffect(()=>{
    dispatch(initialzeAnecdote())
  },[]
)
  
  const notification = useSelector(state=>state.notification)
  return (
    <div>
      <h2>Anecdotes</h2>
      {notification?<Notification/>:<Filter/>}      
      <AnecdoteList />
      <AnecdoteForm/>
    </div>
  )
}

export default App