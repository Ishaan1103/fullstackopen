import { Dairy } from "../types"

const Content = (props: { content: Dairy[] }) =>{
    return(
        <div>
            <h1>Dairies Entries</h1>    
            {props.content.map(c=>{
                return(
                    <div key={c.id}>
                        <h2>{c.date}</h2>
                        <p>visibility: {c.visibility} <br /> weather: {c.weather}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default Content