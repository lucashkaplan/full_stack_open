// render name of course
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// render one course part and corresponding number of exercises
const Part = (props) => {
  console.log('In Part component, props: ')
  console.log(props)
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

// render all course parts and corresponding number of exercises
const Content = (props) => {
  console.log('In Content component, props: ')
  console.log(props)
  console.log('Type of props: ' + typeof props)
  console.log('In Content component, props.parts: ')
  console.log(props.parts)

  // get parts from props
  const parts = props.parts;

  return (
    <div>
      {/* create Part comp for each element in parts */}
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

// render total number of exercises
const Total = (props) => {
  const parts = props.parts;
  // total number of exercises
  const calculateTotalExercises = (parts) => {
    return parts.reduce((sum, part) => sum + part.exercises, 0);
  }
  const exercise_num = calculateTotalExercises(parts);
  
  return (
    <p><b>Total number of exercises: {exercise_num}</b></p>
  )
}

// component to render info for all courses
const Course = ({ course }) => {
  console.log('In Course component, course: ')
  console.log(course)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App