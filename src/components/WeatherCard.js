import { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { ScaleLoader } from 'react-spinners';
import { BsSearch } from 'react-icons/bs';
import Pulse from 'react-reveal/Pulse';

import { getWeatherData} from './WeatherData';

import './weather.css';

const WeatherCard = () => {

    const [weatherdata, setWeatherData] = useState(null);
    const [city, setCity] = useState('Temecula');
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const data = await getWeatherData(city);
            setWeatherData(data);
            setLoading(false);
        } catch (error) {
            console.log('error', error)
            setLoading(false);
        }
    }

    const override = `
    display:block;
    margin: 0 auto;
    border-color: lightblue;
    `;

    useEffect(() => {
        
        getData();
        // eslint-disable-next-line 
    }, []);

    const cardStyle = {
        backgroundColor: '#000000d0',
        color: 'white',
        borderRadius: '30px',
        width: '100%',
        maxWidth: '420px',
        fontStyle: 'italic',
    }

    const degreeStyle = {
        fontSize: '80%',
    }

    return (
        <>
            <div className="card-container">
                <Pulse>
                    <Card style={cardStyle}>
                        <Card.Body>
                            <div className="search">
                                <input className='search-bar' type="text" value={city} placeholder="search" onChange={(e) => setCity(e.target.value)} />
                                <button onClick={() => getData()} type="button"> <BsSearch size={30} /></button>
                            </div>
                            {loading ? (
                                <div className="loader-container">
                                    <ScaleLoader
                                        css={override}
                                        size={200}
                                        color={`#fff`}
                                        loading={loading}
                                    />
                                </div>
                            ) : (
                                <>

                                </>
                            )}
                            {weatherdata !== null ? (
                                <div className="weather">
                                    <h2 className="city">Weather in {weatherdata.name} {weatherdata.sys.country}</h2>
                                    <h1 className="temp">{Math.round(weatherdata.main.temp)} <span style={degreeStyle}>°F</span></h1>
                                    <div className="flex">
                                        <img className='icon' src={`https://api.openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="icon" />
                                        <div className="description">{weatherdata.weather[0].main}</div>
                                    </div>
                                    <div className="humidity">
                                        Max: {Math.round(weatherdata.main.temp_max)} <span style={degreeStyle}>°F</span> ||
                                        Min: {Math.round(weatherdata.main.temp_min)} <span style={degreeStyle}>°F</span> ||
                                        Humidity: {weatherdata.main.humidity}
                                    </div>
                                    <div className="wind">Windspeed: {Math.round(weatherdata.wind.speed)} mph</div>
                                </div>
                            ) : null}
                        </Card.Body>
                    </Card>
                </Pulse>
            </div>
        </>
    );
}

export default WeatherCard;