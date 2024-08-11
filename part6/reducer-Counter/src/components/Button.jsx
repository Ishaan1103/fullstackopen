import { useCounterAndDispatch } from "../CounterContext"
const Button =({ type, label})=>{
    const dispatch =useCounterAndDispatch()
  
    return(  
      <button onClick={()=>dispatch({type})}>{label}</button>
    )
  }
  export default Button