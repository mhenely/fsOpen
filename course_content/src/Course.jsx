const Header = ({ course }) => {
  return (
    <div> 
      {course}
    </div>
  )
}

const Part = ({name, exercises }) => {
  return (
    <div>
      {name}: {exercises}
    </div>
  )
}


const Content = ({ parts}) => {

  return (
    <div>
      {parts.map(part => <Part key={part.name} name={part.name} exercises={part.exercises} />)}
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      Total: {parts.reduce((acc, curr) => {
        return acc + curr.exercises
      }, 0)}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


export default Course