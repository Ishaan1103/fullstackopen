import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer,{setAnecdote} from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import {configureStore } from '@reduxjs/toolkit'
import notiReducer from './reducers/notiReducer'
import anecdoteService from './services/anecdotes.js'

const store = configureStore({
  reducer:{
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification:notiReducer
  }
})

anecdoteService.getAll().then(anecdote => store.dispatch(setAnecdote(anecdote)))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)