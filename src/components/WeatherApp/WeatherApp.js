import React, { useState} from 'react';
import CityWeather from './CityWeather';

const WeatherApp = () => {

    const [cityName, setCityName] = useState("London")
    const [cityNameForWeather, setCityNameForWeather] = useState("London")

    const changeCity = (e)=>{
        setCityName(e.target.value)
    }

    const citySearch = (e)=>{
        e.preventDefault();
        setCityNameForWeather(cityName)
    }

    return(
        <div className="container">
            <CityWeather cityName={cityNameForWeather} />
            <div className="row justify-content-center">
                <form onSubmit={citySearch}>
                    <input type="text" value={cityName} onChange={changeCity} />
                    <input type="submit" className="btn btn-primary" value="Search!" />
                </form>
            </div>
        </div>
    )
}

export default WeatherApp;