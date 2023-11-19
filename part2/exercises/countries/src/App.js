import React, {useEffect, useState} from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([])
  const [countriesToDisplay, setCountriesToDisplay] = useState([])

  const [searchText, setSearchText] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({data}) => {
      setCountries(data)
      console.log(data)
    })
  }, [])

  useEffect(() => {
    setCountriesToDisplay(countries.filter(country => {
      return (country.name?.common?.toLowerCase().includes(searchText.toLowerCase()) || country.name?.official?.toLowerCase().includes(searchText.toLowerCase()))}))
  }, [searchText])

  return (
    <div className="App">
      <div>
        find countries <input type={'text'} value={searchText} onChange={(ev) => setSearchText(ev.target.value)}/>
      </div>
      {
        countriesToDisplay.length === 1 ? 
        <CountryDetails country={countriesToDisplay[0]} />

        :

        countriesToDisplay.length > 10 ?
        <p>Too many matches, specify another filter</p>
        :
        <ul>
        {countriesToDisplay.map(country => {
          return <CountryListItem country={country} />
        })}
      </ul>

      }
      
    </div>
  );
}

const CountryListItem = ({country}) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <li>{country.name.common || country.name.official}<button onClick={() => showDetails ? setShowDetails(false) : setShowDetails(true)}>{showDetails ? 'hide' : 'show'}</button></li>
      {showDetails ? <CountryDetails country={country} />: null}
    </>
  )
}
const CountryDetails = ({country}) => {
  return (
    <div>
<h2>{country.name.common || country.name.official}</h2>
          <p>capital {country.capital[0] || 'No Capital'}</p>
          <p>area {country.area}</p>
          <h3>languages</h3>
          <ul>
            {Object.values(country.languages).map(language => {
              return <li>{language}</li>
            })}
          </ul>
          <img src={`${country.flags?.png}`} alt={`flag for ${country.name.common || country.name.official}`}/>
    </div>
  )
}

export default App;
