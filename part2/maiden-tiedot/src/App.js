import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryView from './components/CountryView'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        setCountries(res.data)
      }).catch(err => console.log(err))
  }, [])

  const updateFilter = (e) => {
    const filterText = e.target.value.toLowerCase()
    const fc = countries.filter(country => {
      return country.name.toLowerCase().includes(filterText)
    })
    setFilteredCountries(fc)
    fc.forEach(c => {
      if (c.name.toLowerCase() == filterText) {
        setFilteredCountries([c])
      }
    })
  }

  return (
    <div>
      <form action="">
        find countries
          <input type="text" name="filtteri" onChange={updateFilter} />
      </form>
      <CountryView countries={filteredCountries} />
    </div>
  );
}

export default App;
