import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdotes } from "../services/anecdote"
import { useNotification } from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [content,dispatch] = useNotification()

  const newAnecdoteMutation = useMutation({
    mutationFn:createAnecdotes,
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:['anecdote']})
    }
  })
  const onCreate = (event) => {
    event.preventDefault()
    const contents = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (contents.length < 5) {
      dispatch({ type: 'SHOW', payload: 'too Short anecdote, must have length 5 or more' });
      setTimeout(() => {
        dispatch({ type: 'HIDE' });
      }, 5000);}

      else{
        newAnecdoteMutation.mutate({content:contents,votes:0})
      dispatch({type:'SHOW',payload:`anecdote '${contents}' created`})
      setTimeout(() => {
      dispatch({type:'HIDE'})
      }, 5000)
      }
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
