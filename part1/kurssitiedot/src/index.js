import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Content = props => {
  console.log(props)
  return (
    <div>
      {
        props.parts.map((p, i) => (
          <Part key={i} name={p.name} exercises={p.exercises} />
        ))
      }
    </div>
  )
}

const Total = props => {
  let total = props.parts.reduce((t, c) => {
    return { exercises: t.exercises + c.exercises };
  }).exercises;
  return (
    <div>
      <p>yhteensä {total} tehtävää</p>
    </div>
  );
}

const Part = props => (
  <>
    <p>{props.name} {props.exercises}</p>
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      }, {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      }, {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));