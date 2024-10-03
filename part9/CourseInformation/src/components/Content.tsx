const Content = (props) =>{
    return(
        <div>
            {props.course.map((c,i)=>(
                <p key={i}>{c.name} {c.exerciseCount}</p>
            ))}
        </div>
    )
}
export default Content