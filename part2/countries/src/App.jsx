import { useState, useEffect } from "react";
import CountryInfo from './components/CountryInfo.jsx';
import service from './services/countryServices.js';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputVal === '') {
      setCountries([]);
    } else {
      setLoading(true);
      service.getAll()
        .then(res => {
          setCountries(res.filter(r => r.name.common.toLowerCase().startsWith(inputVal.toLowerCase())));
          setLoading(false);
        })
        .catch(err => {
          setError('Error fetching countries data');
          setLoading(false);
        });
    }
  }, [inputVal]);

  useEffect(() => {
    if (countries.length === 1) {
      setLoading(true);
      service.weatherAPI(countries[0].capital)
        .then(res => {
          setWeatherData(res);
          setLoading(false);
        })
        .catch(err => {
          setError('Error fetching weather data');
          setLoading(false);
        });
    }
  }, [countries]);

  const countryChange = (e) => {
    setInputVal(e.target.value);
    setError(null);
  };

  const setCountry = (name) => {
    setCountries(countries.filter(i => i.name.common === name));
  };

  return (
    <div>
      <label htmlFor="country">Find Country</label>
      <input id="country" value={inputVal} onChange={countryChange} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {countries.length > 10 ? (
        <p>Too many countries</p>
      ) : countries.length === 1 ? (
        <CountryInfo weatherData={weatherData} country={countries[0]} />
      ) : (
        <ul>
          {countries.map(c => (
            <li key={c.name.common}>
              {c.name.common}{" "}
              <button onClick={() => setCountry(c.name.common)}>Show</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
