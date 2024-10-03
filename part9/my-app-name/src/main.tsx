import ReactDOM from 'react-dom/client'
import App from './App'

/*
const Welcome = (props:WelcomeProps)=>{
  return <h1>Hello, {props.name}</h1>
}

interface WelcomeProps{
  name:string
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Welcome name="Sarah" />
)
*/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App/>
)