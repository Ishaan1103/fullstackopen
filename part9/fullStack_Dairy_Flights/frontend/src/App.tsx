import { useEffect, useState } from "react"
import AddDairy from './components/AddDairy' 
import  Content  from './components/Content'
import { getAllData } from "./services/Dairies"
import { Dairy } from "./types"

function App() {
  const [ dairies, setDairies ] = useState<Dairy[]>([]) 
  useEffect(()=>{
    
    getAllData()
    .then(res => {
      setDairies(res as Dairy[]) 
    })
  },[])
  
  return (
    <>
    <AddDairy dairies={dairies} setDairies={setDairies} />
    <Content content={dairies}/>
    </>
  )
}

export default App
