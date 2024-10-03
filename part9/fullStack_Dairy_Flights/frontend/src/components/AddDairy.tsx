import { useState } from "react"
import { Dairy, NewDairy, Visibility, Weather} from "../types"
import { addData } from "../services/Dairies"
const AddDairy = (props:{ setDairies: (arg0: Dairy[]) => void; dairies: Dairy[] }) =>{
    const [date,setDate] = useState<string>('')
    const [visibility,setVisibility] = useState<Visibility>(Visibility.Great)
    const [weather,setWeather] = useState<Weather>(Weather.Cloudy)
    const [comment, setComment] = useState<string>('')
    const constructData = (e:React.SyntheticEvent) =>{
        e.preventDefault()
        const newObj = {
            date,
            visibility,
            weather,
            comment
        }
        addValue(newObj as Dairy)
        setDate('')
        setVisibility(Visibility.Good)
        setWeather(Weather.Cloudy)
        setComment('')
    }
    const addValue = async(newObj:NewDairy)=>{
        const data = await addData(newObj)
        props.setDairies([...(props.dairies),data] as Dairy[])
    }
    return(
        <div>
            <h1>Add New Entry</h1>
            <form onSubmit={constructData}>
                <div>
                <label htmlFor="date">date: </label>
                <input type="date" id="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                </div>
                <div>
                <label>Visibility: </label>
                
                <input type="radio" id="great" name="visibility" value={Visibility.Great} onChange={()=>setVisibility(Visibility.Great)}/>
                <label htmlFor="great">great</label>
                <input type="radio" id="good" name="visibility" value={Visibility.Good} onChange={()=>setVisibility(Visibility.Good)}/>
                <label htmlFor="good">good</label>
                <input type="radio" id="ok" name="visibility" value={Visibility.Ok} onChange={()=>setVisibility(Visibility.Ok)}/>
                <label htmlFor="ok">ok</label>
                <input type="radio" id="poor" name="visibility" value={Visibility.Poor} onChange={()=>setVisibility(Visibility.Poor)}/>
                <label htmlFor="poor">Poor</label>
                </div>
                <div>
                <label>weather: </label>
                <input type="radio" name="weather" id="sunny" value={Weather.Sunny} onChange={()=>setWeather(Weather.Sunny)} />
                <label htmlFor="sunny">sunny</label>
                <input type="radio" name="weather" id="rainy" value={Weather.Rainy} onChange={()=>setWeather(Weather.Rainy)} />
                <label htmlFor="rainy">rainy</label>
                <input type="radio" name="weather" id="cloudy" value={Weather.Cloudy} onChange={()=>setWeather(Weather.Cloudy)} />
                <label htmlFor="cloudy">cloudy</label>
                <input type="radio" name="weather" id="stormy" value={Weather.Stormy} onChange={()=>setWeather(Weather.Stormy)} />
                <label htmlFor="stormy">stormy</label>
                <input type="radio" name="weather" id="windy" value={Weather.Windy} onChange={()=>setWeather(Weather.Windy)} />
                <label htmlFor="windy">Windy</label>
                </div>
                <div>
                <label htmlFor="comment">comment: </label>
                <input type="text" id="comment" value={comment} onChange={(e)=>setComment(e.target.value)} />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    )
} 
export default AddDairy