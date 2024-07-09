const PersonForm = (props) =>{
    const {addName,newName,newNum,handleNumChange,handleNameChange} = props;
    return(
<div>
    <form onSubmit={addName}>
        <div>
            name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            number: <input value={newNum} onChange={handleNumChange}/>
        </div>
        <div>
            <button type='submit'>add</button>
        </div>
    </form>
</div>
    )
}
export default PersonForm;