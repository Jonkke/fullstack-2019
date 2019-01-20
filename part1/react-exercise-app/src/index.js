import React from 'react';
import ReactDOM from 'react-dom';

const Header = props => (
  <div>
    <h1>{props.course}</h1>
  </div>
)

const Content = props => (
  <div>
    <Part part={props.parts.part1} exercises={props.parts.exercises1} />
    <Part part={props.parts.part2} exercises={props.parts.exercises2} />
    <Part part={props.parts.part3} exercises={props.parts.exercises3} />
  </div>
)

const Total = props => (
  <div>
    <p>yhteensä {props.e1 + props.e2 + props.e3} tehtävää</p>
  </div>
)

const Part = props => (
  <>
    <p>{props.part} {props.exercises}</p>
  </>
)

const App = () => {
  const course = 'Half Stack -sovelluskehitys';
  const part1 = 'Reactin perusteet';
  const exercises1 = 10;
  const part2 = 'Tiedonvälitys propseilla';
  const exercises2 = 7;
  const part3 = 'Komponenttien tila';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content parts={{ part1, part2, part3, exercises1, exercises2, exercises3 }} />
      <Total e1={exercises1} e2={exercises2} e3={exercises3} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));