import { useEffect } from "react"
import { useDispatch } from "react-redux"
import noteService from './services/notes'
import { initialzeNotes, setNotes } from "./reducers/noteReducer"
import NewNote from "./components/NewNote"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initialzeNotes())
  },[])
  
  return (
    <div>
      <NewNote />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}
export default App