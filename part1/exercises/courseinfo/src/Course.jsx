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

export default Course;

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((prev, { exercises }) => prev + exercises, 0)
  return (
    <p>Number of exercises {total}</p>
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