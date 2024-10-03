// import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"

interface CoursePartBase{
  name:string;
  exerciseCount:number;
}

interface CoursePartBasic extends Special {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends Special {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartAdvance extends Special{
  requirements: string[],
  kind: "special"
}

interface Special extends CoursePartBase{
  description:string;
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartAdvance;

const Part = (props) =>{
  return(
    <div>
      {props.content.map((c,i) => {
        switch(c.kind){
          case 'basic':
            return(
              <div key={i}>
                <p><b>{c.name} {c.exerciseCount}</b><br/>{c.description}</p>
              </div>
            )
          case 'group':
            return(
              <div key={i}>
                <p><b>{c.name} {c.exerciseCount}</b><br/>
                project exercises {c.groupProjectCount}</p>
              </div>
            )
          case 'background':
            return(
              <div key={i}>
                <p><b>{c.name} {c.exerciseCount}</b><br />{c.description}<br />submit to <a href={c.backgroundMaterial}>{c.backgroundMaterial}</a></p>
              </div>
            )
          case 'special':
            return(
              <div key={i}>
                <p><b>{c.name} {c.exerciseCount}</b><br />{c.description}<br />required skills: {c.requirements.map((l)=> <span key={l}>{l} </span>)}</p>
              </div>
            )
          default:
            <p>not known</p>
            break;
        }
      })}
    </div>
  )
} 
function App() {
  const courseName:string = 'Half Stack application development'
  const coursePart:CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ]

  const totalExercise = coursePart.reduce((sum,part)=>sum+part.exerciseCount,0)
  return (
    <>
    <Header name={courseName}/>
    <Part content={coursePart} />
    {/* <Content course={coursePart}/> */}
    <Total total={totalExercise}/>
    </>
  )
}

export default App
