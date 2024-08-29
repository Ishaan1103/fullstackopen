const Filter = (props) =>{
    const {searchItem} = props;
    return(
        <div>
            <p>filter show with <input onChange={searchItem}/></p>
        </div>
    )
}
export default Filter;