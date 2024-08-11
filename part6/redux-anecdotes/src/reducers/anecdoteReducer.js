import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes.js'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => Number(100000 * Math.random()).toFixed(0)



const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

const anecdoteSlice = createSlice ({
  name:'anecdote',
  initialState:[],
  reducers:{
    upVotes(state,action){
      const id = action.payload.id
      const oldAnecdote = state.find(n => n.id === id)

      const changedAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1
      }
      
      return state.map(n => n.id !== id ? n : changedAnecdote)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdote(state,action){
      return action.payload
    }
  }
})
/*
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UP_VOTE':
      const id = action.payload.id
      const oldAnecdote = state.find(n => n.id === id)
      const changedAnecdote = {
        ...oldAnecdote,
        votes: oldAnecdote.votes + 1
      }
      return state.map(n => n.id !== id ? n : changedAnecdote)
    case 'ADD_ANECDOTE':
      return [...state, action.payload]
  }
  return state
}

export const newAnecdote = (contents) => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {
      content: contents,
      id: getId(),
      votes: 0
    }
  }
}

export const upVotes = (id) => {
  return {
    type: 'UP_VOTE',
    payload: { id }
  }
}
*/
export const {upVotes,setAnecdote,appendAnecdote} = anecdoteSlice.actions

export const initialzeAnecdote = () =>{
  return async dispatch =>{
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdote))
  }
}

export const addAnecdotes = (content)=>{
  return async dispatch=>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote =(id)=>{
  return async dispatch =>{
    const anecdote = await anecdoteService.getAll()
    const anecdoteToUpdate = anecdote.find(n=>n.id === id)
    
    if (!anecdoteToUpdate) {
      console.error(`Anecdote with id ${id} not found.`);
      return;
    }

    const updatedAnecdote={
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1 
    }
    await anecdoteService.update(id,updatedAnecdote)
    dispatch(upVotes(updatedAnecdote))
  }
}
export default anecdoteSlice.reducer