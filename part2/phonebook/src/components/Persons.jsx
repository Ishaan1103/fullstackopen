const Persons = (props) =>{
    const {person, deleteUser} = props;
    return(
        <div>
            {person.name} {person.number} <button onClick={deleteUser}>delete</button>
        </div>
    )
}
export default Persons;