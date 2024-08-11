import axios from "axios"

export const getAll = () => {
    return axios.get('http://localhost:3001/anecdotes').then(res=>res.data)
}
export const createAnecdotes = (newObj)=>{
    return axios.post('http://localhost:3001/anecdotes',newObj).then(res=>res.data)
}
export const updateAnecdote = (anecdote)=>(
    axios.put(`http://localhost:3001/anecdotes/${anecdote.id}`,anecdote).then(res=>res.data)
)
