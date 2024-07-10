import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import{useState,useEffect} from'react'
import phoneService from './services/phonebook.js'
const App = () => {
  const[persons,setPersons]=useState([])
  const [newName,setNewName]=useState('');
  const [newNum,setNewNum]=useState('')
  const [searchPhone,setSearchPhone]=useState('');
  useEffect(()=>{
    phoneService.getAll()
    .then(res => {
      setPersons(res)
    })
    .catch(error =>{
      alert(`cannot find data from server ${error}`)
    })
  },[])
  
  
  
  const filterPerson = persons.filter((person)=>
    person.name.toLowerCase().includes(searchPhone.toLowerCase())
  ); 
  const searchItem = (e)=>{
    setSearchPhone(e.target.value);
  }
  const handleNameChange=(e)=>{
    setNewName(e.target.value)
  }
  const handleNumChange=(e)=>{
    setNewNum(e.target.value)
  }
  const addName = (e) =>{ 
    e.preventDefault();
    const nameExist = persons.find((person)=>person.name === newName);
    
    if(nameExist){
        if(window.confirm(`${nameExist.name} is already added to phonebook, replace the old number with the new one?`)){
          const newObject = {
            ...nameExist,
            number: newNum
          }
          phoneService.update(nameExist,newObject)
          .then(res => {
            setPersons(persons.map(person => person.id !== nameExist.id ? person : res))
          })
          .catch((err)=>{
            alert(`old number is not able to update ${err}`);
          })
        }
    }
    else{
      const addPerson = {
        name:newName,
        number:newNum
      }
      phoneService.create(addPerson)
      .then((res)=>{
        setPersons(persons.concat(res))
        setNewName('')
        setNewNum('')
      })
      .catch((err)=>{
        alert(`not able to create a element ${err}`)
      })
    }
  }
  const deleteUserId =(id)=>{
    const deleteUser = persons.find(person=>person.id === id)
    phoneService.remove(deleteUser)
    .then(
      setPersons(persons.filter((person)=>person.id !== id))
    )
    .catch((err)=>{
      alert(`cannot delete user${err}`);
    })
  }
  return(
    <div>
      <h2>Phonebook</h2>
      <Filter searchItem={searchItem}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName}newName={newName} newNum={newNum} handleNumChange={handleNumChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>
      {filterPerson.map((person)=> <div key={person.id}><Persons person={person} deleteUser={()=>deleteUserId(person.id)}/></div>)}
    </div>
  )
}
export default App;