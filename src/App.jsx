import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./styles/hole.css";
import Satellite from "./assets/Satellite.png";

// const api_key =  import.meta.env.VITE_WEATHER_API_KEY;
const api_key="0bf011dc6b539cc636644ce99179fe94";
const App = () => {
  const [coord, setCoord] = useState([]);
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("London");
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleLocationChange = (e) => {
    const newLocation = e.target.value
    setLocation(newLocation);
  }

  const SubmitLocation = () => {
    
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${api_key}`)
      .then(res => setCoord(res.data))
      .catch(err => console.log(err));
  }
  
  useEffect(() => {
    if (location) {
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${api_key}`)
        .then(res => setCoord(res.data))
        .catch(err => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (coord.length > 0) {
      const { lat, lon } = coord[0];
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
        .then((res) => {
          setWeather(res.data);
          updateBackgroundImage(res.data.weather[0].description);
        })
        .catch(err => console.log(err));
    }
  }, [coord]);

  const updateBackgroundImage = (description) => {
    let imageUrl = '';

    switch (description.toLowerCase()) {
      case 'clear sky':
        imageUrl = 'https://th.bing.com/th?id=OIP.1BNXPq-fvc31m6BjtcPBngHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2';
        break;
      case 'few clouds':
        imageUrl = 'https://th.bing.com/th?id=OIP.F-eRCXX-5OpvtAHVhk0GywHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2';
        break;
      case 'scattered clouds':
        imageUrl = 'https://th.bing.com/th?id=OIP.6918ysOR8WCYnXlzBXLEmgHaEO&w=331&h=188&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2';
        break;
      case 'broken clouds':
        imageUrl = 'https://th.bing.com/th/id/OIP.muuQezHI2PyRfnQ3zW6fpwHaFj?w=268&h=201&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'overcast clouds':
        imageUrl = 'https://th.bing.com/th/id/OIP.kusuNQwqDGXNwzv6t2PeDwHaEK?w=298&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'light rain':
      case 'moderate rain':
      case 'heavy rain':
      case 'very heavy rain':
      case 'shower rain':
        imageUrl = 'https://th.bing.com/th/id/OIP.5c7vKdtP_23NgL-tLhcR2gHaEo?w=329&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'light drizzle':
      case 'moderate drizzle':
      case 'heavy drizzle':
        imageUrl = 'https://th.bing.com/th/id/OIP.DlUse3h8C7T4Q3g0hQES4wHaEK?w=333&h=187&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'thunderstorm':
        imageUrl = 'https://th.bing.com/th/id/OIP.0xdzlt5vFtVp5QzyShYF-QHaE7?w=298&h=198&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'light snow':
      case 'moderate snow':
      case 'heavy snow':
      case 'snow showers':
        imageUrl = 'https://th.bing.com/th/id/OIP.Yf5UZeDAMkZdghPDl1vZ0AHaE7?w=263&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'mist':
        imageUrl = 'https://th.bing.com/th/id/OIP.ctieSQ_t8miyo3CYrcFpWQHaE8?w=254&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'smoke':
        imageUrl = 'https://th.bing.com/th/id/OIP.QBZSmGjmtDu6rUhN2n40lwHaE8?w=252&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'haze':
        imageUrl = 'https://th.bing.com/th/id/OIP.SIiC8jHpv9Tccz_Da_BZOgHaEp?w=289&h=181&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'dust':
        imageUrl = 'https://th.bing.com/th/id/OIP.EIk7jQw60i69Vx9DoOjIHAHaJ3?w=120&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'fog':
        imageUrl = 'https://th.bing.com/th/id/OIP.tJCfnCSk4p2nysVOiltIrwHaE8?w=239&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      case 'sand':
        imageUrl = 'https://th.bing.com/th/id/R.adeb5ec0f328a626db0e15d2092f593a?rik=fRpj%2b8X7eLmemA&riu=http%3a%2f%2fi.huffpost.com%2fgadgets%2fslideshows%2f414946%2fslide_414946_5264412_free.jpg&ehk=aMjPZKnJxBp715CKkTAcDE6pP3tCNszZW1bu69MpNOw%3d&risl=&pid=ImgRaw&r=0';
        break;
      case 'tornado':
        imageUrl = 'https://th.bing.com/th/id/OIP.ZE8HajCiiEVPgL9f_mSIIwHaFj?w=249&h=187&c=7&r=0&o=5&dpr=1.4&pid=1.7';
        break;
      default:
        imageUrl = 'https://images.unsplash.com/photo-1676910226586-eb747ab85443?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8'; // Fallback image
        break;
    }

    setBackgroundImage(imageUrl);
  }


      // console.log(weather)

  // if (!coord.length || !weather.main) {
  //   return <>
  //   <div className="div flex justify-center items-center h-[100vh]    sm:flex sm:justify-center sm:items-center sm:h-[100vh]">
  //     <p className='text-3xl  text-center uppercase  sm:text-4xl sm:text-center sm:uppercase'>Loading ...</p>
  //   </div>
  //   </>
  // }

  return (
    <div className="App w-full h-[100vh]  flex justify-center items-center  sm:flex sm:justify-center sm:items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="wrapper m-4 w-full h-[70vh] relative   overflow-hidden rounded-3xl  grid grid-cols-12 grid-rows-12   sm:size-[80vh] sm:relative sm:overflow-hidden sm:rounded-3xl sm:grid sm:grid-cols-12 sm:grid-rows-12">
        <div className="searchBar   col-span-12 row-span-3 flex justify-center flex-col items-center  sm:col-span-12 sm:row-span-3 sm:flex sm:justify-center sm:flex-col sm:items-center">
          <input className='SearchBar' type="text" value={location} onChange={handleLocationChange} /> <br />
          <button className='sm:p-2 sm:rounded-xl  p-2 rounded-xl ' onClick={SubmitLocation} >Search</button>
        </div>
        <div className="location-Name  col-span-12 row-span-2 flex justify-center flex-col items-center text-2xl font-extrabold uppercase  sm:col-span-12 sm:row-span-2 sm:flex sm:justify-center sm:flex-col sm:items-center sm:text-2xl sm:font-extrabold sm:uppercase">
          
          <h1 className='sm:text-white'>
            {coord[0]?.name || 'Location'}
            </h1> 
          
          <h1 className='text-xl text-white    sm:text-xl sm:text-white'>
            {coord[0]?.state || "Country"}
          </h1>

        </div>
        <div className="temperature col-span-12 row-span-2 flex justify-center items-center flex-col   sm:col-span-12 sm:row-span-2 sm:flex sm:justify-center sm:items-center sm:flex-col">
          <h1 className='temp  text-2xl uppercase font-medium  sm:text-2xl sm:uppercase sm:font-medium'>
          {(coord.length || weather.main)? (weather.main?.temp  - 273).toFixed(2) + "°C" : "N/A"}  
          </h1>
          <div className="div  flex justify-center items-center gap-4  sm:flex sm:justify-center sm:items-center sm:gap-4">
            <h1 className='FeelsLike   text-xl font-bold text-[#000]  sm:text-xl sm:font-bold sm:text-[#000]'>Feels Like</h1>
            <h1 className='FeelsLike   text-xl font-bold text-[#000] sm:text-xl sm:font-bold sm:text-[#000] '>
            {(coord.length || weather.main)? (weather.main?.feels_like  - 273).toFixed(2) + "°C" : "N/A"}                </h1>
          </div>
        </div>
        <div className="Max-Min   col-span-12 row-span-2 flex justify-between m-4 gap-8  sm:col-span-12 sm:row-span-2 sm:flex sm:justify-between sm:m-4">
          <div className="leftCircle">
            <h2 className='Min-Temp  text-xl flex flex-col-reverse justify-center items-center  sm:text-xl sm:flex sm:flex-col-reverse sm:justify-center sm:items-center'>
              <span className='text-sm uppercase mt-4 text-[#000]  sm:text-sm sm:uppercase sm:font-bold sm:mt-4 sm:text-[#000]'>Min-Temp</span>
              <span className='font-extrabold mt-2  sm:font-extrabold sm:mt-2 '>
               {(coord.length || weather.main)? (weather.main?.temp_min  - 273).toFixed(2) + "°C" : "N/A"}  
              </span>
            </h2>
          </div>
          <h3><img className='satellite w-10 h-10 sm:w-14 sm:h-16' src={Satellite} /></h3>
          <div className="rightCircle">
            <h2 className='Max-Temp  flex flex-col-reverse justify-center items-center sm:flex sm:flex-col-reverse sm:justify-center sm:items-center'>
              <span className='text-sm uppercase mt-4 text-[#000]  sm:text-sm sm:uppercase sm:font-bold sm:mt-4 sm:text-[#000]'>Max-Temp</span>
              <span className='font-extrabold text-xl mt-2   sm:font-extrabold sm:text-xl sm:mt-2'>
              {(coord.length || weather.main)? (weather.main?.temp_max  - 273).toFixed(2) + "°C" : "N/A"}
               </span>
            </h2>
          </div>
        </div>
        <div className="description   col-span-12 flex justify-between items-center overflow-scroll   row-span-3   sm:col-span-12 sm:row-span-3 sm:overflow-hidden sm:flex sm:justify-between">
          <div className="relative    p-0 text-[0.7rem] sm:text-sm text-nowrap sm:p-4 col-span-2 flex flex-col-reverse justify-center items-center  sm:col-span-3 sm:flex sm:flex-col-reverse sm:justify-center sm:items-center humidity">
            <h1>Humidity</h1>
            <h2>{weather.main?.humidity || 'N/A'}</h2>
          </div>
          <div className="text-[0.7rem] sm:text-sm text-nowrap p-4 sm:p-4 col-span-2 flex flex-col-reverse justify-center items-center  sm:col-span-3 sm:flex sm:flex-col-reverse sm:justify-center sm:items-center weather-type">
            <h1>Weather</h1>
            <h2>{weather.weather?.[0]?.description || 'N/A'}</h2>
          </div>
          <div className="text-[0.7rem] p-6 sm:text-sm text-nowrap sm:p-4 col-span-2 flex flex-col-reverse justify-center items-center   sm:col-span-3 sm:flex sm:flex-col-reverse sm:justify-center sm:items-center wind-speed">
            <h1>Wind Speed</h1>
            <h2>{(weather.wind?.speed * 3.6 || 0).toFixed(2) || 'N/A'} Kp/h</h2>
          </div>
          <div className="text-[0.7rem] p-6 sm:text-sm text-nowrap sm:p-4 col-span-2 flex flex-col-reverse justify-center items-center   sm:col-span-3 sm:flex sm:flex-col-reverse sm:justify-center sm:items-center deg">
            <h1>Degrees</h1>
            <h2>{weather.wind?.deg || 'N/A'}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
