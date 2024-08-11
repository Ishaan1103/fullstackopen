import { createSlice,current } from "@reduxjs/toolkit"
import noteService from '../services/notes.js'
const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  },
] 

const generarteId = ()=>{
  return Number((Math.random()*1000000)).toFixed()
}

const noteSlice = createSlice({
  name:'notes',
  initialState:[],
  reducers:{
    toggleImportanceOf(state,action){
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important:!noteToChange.important
      }

      return state.map(note => note.id !== id? note : changedNote)
    },
    appendNote(state,action){
      state.push(action.payload)
    },
    setNotes(state,action){
      return action.payload
    }
  },
})
// const noteReducer = (state = initialState,action)=>{
//   switch (action.type) {
//     case 'NEW_NOTE':
//         return [...state,action.payload]
//     case 'TOGGLE_IMPORTANT':
//         const id = action.payload.id
//         const noteToChange = state.find(n=>n.id === id)
//         const changedNote = {
//             ...noteToChange,
//             important: !(noteToChange.important)
//         }
//         return state.map(n => n.id !== id ? n: changedNote)
//     default:
//         return state;
//   }
// } 

// export const createNote = (content)=>{
//   return {
//     type : 'NEW_NOTE',
//     payload:{
//       content,
//       important:false,
//       id: generarteId()
//     }
//   }
// }
// export const toggleImportanceOf =(id)=>{
//   return{
//     type:'TOGGLE_IMPORTANT',
//     payload:{id}
//   }
// }
export const {toggleImportanceOf,appendNote,setNotes} = noteSlice.actions
export const initialzeNotes = () =>{
  return async dispatch =>{
    const notes = await noteService.getAll()
    dispatch(setNotes(notes))
  }
}
export const createNote = content =>{
  return async dispatch =>{
    const newNote = await noteService.createNew(content)
    dispatch(appendNote(newNote))
  }
} 
export default noteSlice.reducer