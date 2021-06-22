import axios from 'axios';

const API_Key = '009ec4900897ce614b59880f2f032881';
export const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

export const getWeatherData = async (cityname) => {
    try {
        const {data} = await axios.get(baseUrl + `q=${cityname}&units=imperial&appid=${API_Key}`);
        return data;
    } catch (error) {
        throw error;
    }
}
