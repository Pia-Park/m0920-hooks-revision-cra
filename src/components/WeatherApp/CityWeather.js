import React, { useState, useEffect} from 'react';
import axios from 'axios';

const CityWeather = (props) => {

    const [weatherIcon, setWeatherIcom] = useState('')

    // state = {}
    useEffect(()=>{
        getWeather();
    },[props.cityName])

    async function getWeather(){
        const result = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${props.cityName}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
        ).then(resposeData => {
            console.log(resposeData);
        }).catch(error => console.log(error))
    } 

 
    const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`

    return(
        <h1>{props.cityName}</h1>
    )
}



export default CityWeather;