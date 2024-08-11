import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer.js'
import { clearNotification, setNotification } from '../reducers/notiReducer.js'
const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(anecdote =>
            anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
    })

    const dispatch = useDispatch()

    const vote = (content,id) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You voted for ${content}`,10))
    }

    const compareFn = (a, b) => {
        if (a.votes > b.votes) {
            return -1;
        }
        else {
            return 1;
        }
    }
    const sortedArr = [...anecdotes].sort(compareFn)
    return (
        <div>
            {sortedArr.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={()=>vote(anecdote.content,anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default AnecdoteList