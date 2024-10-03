type CoursePart = CoursePartsBasic | CoursePartsGroup | CoursePartsBackground;

interface CoursePartBase{
  name:string;
  exerciseCount:number;
}

interface CoursePartsBasic extends CoursePartBase {
  description:string;
  kind:"basic"
}
interface CoursePartsGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
interface CoursePartsBackground extends CoursePartBase {
  description:string;
  backgroundMaterial: string;
  kind: "background"
}


function App() {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
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
  ]

  const assertNever = (value:never):never=>{
    throw new Error(
      `Unhandled discriminated union member ${JSON.stringify(value)}`
    );
  };
  return (
    <>
    <h1>{courseName}</h1>
    {courseParts.forEach(part => {
      switch(part.kind){
        case "basic":
          console.log(part.name, part.exerciseCount, part.description);
          break;
        case "group":
          console.log( part.name, part.exerciseCount, part.groupProjectCount );
          break;
        case "background":
          console.log( part.name, part.exerciseCount, part.description, part.backgroundMaterial );
          break;
        default:
          return assertNever(part)  
      }
    }
    )}
    </>
  )
}

export default App