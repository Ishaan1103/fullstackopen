import Total from "./Total";
const Course = ({ course })=>{
return(
<div>
<h1>{course.name}</h1>
{course.parts.map(part=>(
    <p key={part.id}>{part.name} {part.exercises}</p>
))}
<Total parts={ course.parts }/>
</div>
)}
export default Course;