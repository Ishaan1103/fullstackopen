const CountryInfo = ({ country, weatherData }) => {
  const languages = Object.keys(country.languages || {});

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area} km²</p>
      <div>
        <p style={{ fontWeight: 'bold', fontSize: 20 }}>Languages</p>
        <ul>
          {languages.map((l) => (
            <li key={l}>{country.languages[l]}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt={country.flags.alt} />
      <div>
        <h2>Weather in {country.name.common}</h2>
        {weatherData.main ? (
          <div>
            <div>Temperature: {weatherData.main.temp} Kelvin</div>
            <div>
              <img style={{ width: 150 }}
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                alt={weatherData.weather[0].description}
              />
            </div>
              <p>Wind: {weatherData.wind.speed} m/s</p>
          </div>
        ) : (
          <p>No weather data available</p>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;
