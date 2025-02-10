// render name of course
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

// render 1 course part and number of exercises
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

// render all course parts and corresponding number of exercises
const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0]} exercises={props.exercises[0]} />
      <Part part={props.parts[1]} exercises={props.exercises[1]} />
      <Part part={props.parts[2]} exercises={props.exercises[2]} />
    </div>
  )
}

// render total number of exercises
const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1.name, part2.name, part3.name]
  const exercises = [part1.exercises, part2.exercises, part3.exercises]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App