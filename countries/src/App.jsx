  // HAVING ISSUES IMPLEMENTING THE SHOW BUTTON
  // CANNOT FIGURE OUT APPROPRIATE WAY TO SELECT ONE COUNTRY'S INFO TO SHOW
  
  // have button to show each country's info
  // if only one, show all info

// get weather data via api for currently selected country
import services from "./services"
import { useState, useEffect } from "react"

// get all countries from api upon initial render and then filter

const CountryList = ({ name, handleShow }) => {
  return (
    <li>
      {name}
      <button onClick={() => handleShow(name)}>show</button>
    </li>
  )
}

const Country = ({ country }) => {

  const languages = Object.values(country.languages)
  console.log({languages})
  return (
    <div>
      <h2>{country.name.official}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <h3>Currency</h3>
      {country.flag}
    </div>

  )
}

const App = () => {

  const [ list, setList ] = useState([])
  const [ search, setSearch ] = useState('')
  const [ showACountry, setShowACountry ] = useState('')

  useEffect(() => {
    services
      .getAll()
      .then(countries => {
        setList(countries)
      })
  }, [])

  
  const handleFilterChange = ({ target }) => {
    setSearch(target.value)
  }

  const handleShow = (name) => {
    setShowACountry(name)
  }

  const listToShow = search 
    ? list.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()))
    : list

  return (
    <div>
      <button onClick={() => setSearch('')}>Test</button>

      find countries: <input value={search} onChange={handleFilterChange}/>

      {
        listToShow.length > 10
          ? `Be more specific. There are ${listToShow.length} countries which is ${listToShow.length - 10} too many to display. `
          : listToShow.length === 1 || showACountry
            ? <Country country={listToShow[0]}/>
            : listToShow.map(country => <CountryList key={country.name.official} name={country.name.common} handleShow={handleShow} />)
      }
    </div>
  )
}

export default App