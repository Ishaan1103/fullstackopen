import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
const filter = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value))
    }
    const style = {
        marginBottom: 10
    }
    return(
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}
export default filter