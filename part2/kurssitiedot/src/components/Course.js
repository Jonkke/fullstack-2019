import React from 'react'

const Header = props => (
  <div>
    <h1>{props.name}</h1>
  </div>
)

const Content = props => {
  return (
    <div>
      {
        props.parts.map((p, i) => (
          <Part key={p.id} name={p.name} exercises={p.exercises} />
        ))
      }
    </div>
  )
}

const Part = props => (
  <>
    <p>{props.name} {props.exercises}</p>
  </>
)

const Total = props => {
  let total = props.parts.length < 1 ? 0 : props.parts.reduce((t, c) => {
    return { exercises: t.exercises + c.exercises };
  }).exercises;
  return (
    <div>
      <p>yhteensä {total} tehtävää</p>
    </div>
  );
}

const Course = ({ course }) => {

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

export default Course