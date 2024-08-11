
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getNotes, createNote, updateNote } from "./requests"
const App = () => {
  const queryClient = useQueryClient()

  const newNoteMutation = useMutation({
    mutationFn:createNote,
    onSuccess:(newNote)=>{
      const notes = queryClient.getQueriesData(['notes'])
      queryClient.setQueriesData(['notes'],notes.concat(newNote))
    },
  })
  const result = useQuery({
    queryKey:['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  
  const updateNoteMutation = useMutation({
    mutationFn:updateNote,
    onSuccess:()=>{
      queryClient.invalidateQueries('notes')
    },
  })

  if(result.isLoading){
    return <div>loading data...</div>
  }
  const notes = result.data

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    newNoteMutation.mutate({content, important:true})
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note,important:!note.important})
  }

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App