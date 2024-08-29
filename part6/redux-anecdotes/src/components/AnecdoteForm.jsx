import { useDispatch } from "react-redux"
import { setNotification,clearNotification } from "../reducers/notiReducer"
import {addAnecdotes} from '../reducers/anecdoteReducer.js'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdotes = async(e)=>{
        e.preventDefault()
        const content = e.target.anecdotes.value
        e.target.anecdotes.value = ''
        dispatch(addAnecdotes(content))
        dispatch(setNotification(`You created a new anecdote: ${content}`,5))
        setTimeout(() => {
        dispatch(clearNotification())
    }, 5000)
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdotes}>
                <div>
                    <input name='anecdotes' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm