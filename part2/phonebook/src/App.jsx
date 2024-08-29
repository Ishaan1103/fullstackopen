import Filter from "./components/Filter.jsx"
import PersonForm from "./components/PersonForm.jsx"
import Persons from "./components/Persons.jsx"
import{useState,useEffect} from'react'
import phoneService from './services/phonebook.js'
import Notification from "./components/Notification.jsx"
const App = () => {
  const[persons,setPersons]=useState([])
  const [newName,setNewName]=useState('');
  const [newNum,setNewNum]=useState('')
  const [searchPhone,setSearchPhone]=useState('');
  const [errMessage,setErrMessage] = useState(null)

  useEffect(()=>{
    phoneService.getAll()
    .then(res => {
      setPersons(res)
    })
    .catch(error =>{
      setErrMessage(
        `Cannot get Numbers from server ${error}`
      )
      setTimeout(() => {
        setErrMessage(null)
      }, 5000);
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
            setErrMessage(`${nameExist.name} number has been changed`)
            setTimeout(() => {
              setErrMessage(null)
            }, 5000);
          })
          
          .catch(()=>{
            setErrMessage(`${nameExist.name} do not exist in the list it may be already deleted!`)
            setTimeout(() => {
              setErrMessage(null)
            }, 5000);
            setPersons(persons.filter(person=> person.id !== nameExist.id ))
          })
          setNewName('')
          setNewNum('')
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
        setErrMessage(
          `${res.name} has been added`
        )
        setTimeout(() => {
          setErrMessage(null)
        }, 5000);
      })
      .catch((err)=>{
        setErrMessage(
          'Cannot add Person in list ',err
        )
        setTimeout(() => {
          setErrMessage(null)
        }, 5000);
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
    setErrMessage(`removed ${deleteUser.name} `)
    setTimeout(() => {
      setErrMessage(null)
    }, 5000);
  }
  return(
    <div>
      <h2>Phonebook</h2>
      <Notification message={errMessage}/>
      <Filter searchItem={searchItem}/>
      <h3>Add a new</h3>
      <PersonForm addName={addName}newName={newName} newNum={newNum} handleNumChange={handleNumChange} handleNameChange={handleNameChange}/>
      <h2>Numbers</h2>
      {filterPerson.map((person)=> <div key={person.id}><Persons person={person} deleteUser={()=>deleteUserId(person.id)}/></div>)}
    </div>
  )
}
export default App;