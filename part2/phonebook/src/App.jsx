import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import{useState} from'react'
const App = () => {
  const[persons,setPersons]=useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName,setNewName]=useState('');
  const [newNum,setNewNum]=useState('')
  const [searchPhone,setSearchPhone]=useState('');
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
      alert(`${nameExist.name} already exist in phonebook change name`)
    }
    else{
      const addPerson = {
        name:newName,
        number:newNum,
        id:persons.length + 1,
      }
      setPersons(persons.concat(addPerson))
      setNewName('')
      setNewNum('')
    }
  }
  return(
    <div>
      <h2>Phonebook</h2>
      <Filter searchItem={searchItem}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName}newName={newName} newNum={newNum} handleNumChange={handleNumChange} handleNameChange={handleNameChange}/>
      
      <h2>Numbers</h2>
      <Persons filterPerson={filterPerson}/>
      
    </div>
  )
}
export default App;