import { useState, useEffect } from "react"
import { Note } from "./types"
import { getAllNotes, createNote } from "./service/noteService"

function App() {
  const [newNote, setNewNote] = useState('')
  const [notes,setNotes] = useState<Note[]>([{ id: '1', content: 'testing' }])
  
  useEffect(()=>{
    getAllNotes().then(data => {
      setNotes(data)
    })
  },[])

  const noteCreation = (e:React.SyntheticEvent)=>{
    e.preventDefault()
    createNote({content:newNote}).then(data=>{
      setNotes([...notes,data])
    })
    setNewNote('')
  }
  return (
    <div>
      <form onSubmit={noteCreation}>
        <input value={newNote} onChange={(event)=>setNewNote(event.target.value)} />
        <button type="submit">add</button>
      </form>
      <div>
        {notes.map(note=>(
        <p key={note.id}>{note.content}</p>
      ))}
      </div>
    </div>
  )
}

export default App
