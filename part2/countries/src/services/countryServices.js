import axios from 'axios';

const apiKey = import.meta.env.VITE_SOME_KEY;

const getAll = async () => {
    const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all');
    return response.data;
};

const weatherAPI = async (city) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    return response.data;
};

export default { getAll, weatherAPI };
