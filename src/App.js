import React, { useState } from 'react';
import axios from 'axios';
import './index.css'

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=33da2b246bed5e5268e150e3a3088767`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      axios.get(url).then((response) => {
        setData(response.data);
        // console.log(response.data);
      })
      setLocation('');
    }
  } 
  
  function convertToCelcius(value){
    return ((value) - 32) * 9/5;
  }

  function myFunction(){
    alert('hi')
  }

  return ( 
    <div className="app">
      <div className="search">
        {/* <p>{toCelcius(82)}</p> */}
        {/* {  convertToCelcius(82)} */}   
        
        <input 
          type='text' 
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>

          {data.name != undefined &&
          
          <> 


              {/* <button class="button" onClick={() => alert(data.main.temp) }>In Celcius</button> */}

              {/* <button class="button" onClick={convertToCelcius(data.main.temp)}>In Celcius</button>         */}

              <button className="conversionBtn" >In Celcius</button>        
              <p id='rslt'></p>

              {
                window.addEventListener('DOMContentLoaded', (event) => {
                  const el = document.getElementsByClassName('conversionBtn');

                  if(el){
                    el.addEventListener('click', function(event){
                      document.getElementById("rslt").innerHTML = convertToCelcius(data.main.temp);
                      // alert('hi');
                    });
                  }
                })
              }  
          </> 
          }
        </div>
        
        {data.name != undefined &&
            
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div> 
        }     
      </div>
    </div>
  );
}

export default App;