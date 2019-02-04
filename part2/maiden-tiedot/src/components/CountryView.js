import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryView = ({ countries }) => {
  const [picked, setPicked] = useState(null)
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    setPicked(null)
    setWeatherData({})
  }, [countries])
  useEffect(() => {
    if (picked &&
      Object.entries(weatherData).length === 0 && weatherData.constructor === Object) {
      axios.get(`http://api.apixu.com/v1/current.json?key=${process.env.REACT_APP_APIXU_KEY}=${picked.capital}`)
        .then(res => setWeatherData(res.data.current)).catch(err => console.log(err))
    }
  }, [picked])

  const pickCountry = c => () => {
    setPicked(c)
  }

  if (picked) {
    const c = picked

    return (
      <div>
        <h2>{c.name}</h2>
        <p>Capital: {c.capital}</p>
        <p>Population: {c.population}</p>
        <h4>Languages</h4>
        <ul>
          {c.languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img width={100} src={c.flag} alt={"flag of" + c.name} />
        <h3>Weather in {c.capital}</h3>
        <p>Temperature: {weatherData.temp_c}</p>
        <p>Wind: {weatherData.wind_kph} kph, direction {weatherData.wind_dir} </p>
      </div>
    )
  }
  else if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter!</p>
      </div>
    )
  }
  else if (countries.length > 1) {
    return (
      <ul>
        {
          countries.map((c, i) => (
            <div key={c.name}>
              <li>{c.name} <button onClick={pickCountry(c)}>show</button></li>
            </div>
          ))
        }
      </ul>
    )
  }
  else if (countries.length == 1) {
    setPicked(countries[0])
  }
  else {
    return (
      <div>Nothing to return...</div>
    )
  }
}

export default CountryView