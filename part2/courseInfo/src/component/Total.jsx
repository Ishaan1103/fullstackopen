const Total = ({parts}) =>{
    const total = parts.reduce((s, parts) => {
        return s+parts.exercises;
      },0)
    return(
        <div>
            <p><b>total of {total} exercises</b></p>
        </div>
    )
}
export default Total;