import React from 'react';


const Course = ({course}) => {
  return (
<div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((prev, { exercises }) => prev + exercises, 0)
  return (
    <p style={{fontWeight: 'bold'}}>total of {total} exercises</p>
  )
}

const Content = ({ parts }) => {

  return (
    <div>
      {parts.map(part => {
        return <Part part={part} key={part.name} />
      })}
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

export default Course