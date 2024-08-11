import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getAll } from './services/anecdote'
import { updateAnecdote } from './services/anecdote'
import { useNotification } from './NotificationContext'

const App = () => {

  const [content,dispatch] = useNotification()

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn:updateAnecdote,
    onSuccess:()=>queryClient.invalidateQueries('anecdote')
  }) 

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote,votes:anecdote.votes+1})
    dispatch({type:'SHOW',payload:`anecdote '${anecdote.content}' voted`})
      setTimeout(() => {
      dispatch({type:'HIDE'})
      }, 5000)
  }

  const result = useQuery({
    queryKey:['anecdote'],
    queryFn:getAll,
    retry:false,
    refetchOnWindowFocus: false
  })

  if(result.isLoading){
    return <div>Loading...</div>
  }

  if(result.isError){
    return <div>anecdote server is not available due to problem in server</div>
  }



  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
