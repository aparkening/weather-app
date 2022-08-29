import React, { Component } from 'react'
// import Moment from 'react-moment';
import moment from 'moment';

export default class Hourly extends Component {

  // Get subset of hourly data from 3 arrays; display hourly data after now
  getDisplayArr = () => {
    const now = new Date();
    const isoNow = now.toISOString();
    const timeArray = this.props.hourly.time;
    const tempArray = this.props.hourly.temperature_2m;
    const codeArray = this.props.hourly.weathercode;

    // Find index of first time later than current
    const startIndex = timeArray.indexOf(timeArray.find(time => time >= isoNow));

    // Store time, temperature, and weathercode for every 3 hours over next day
    let displayArr = [];
    for (let i = startIndex; i < startIndex + 23; i += 3) {
      displayArr.push({
        time: timeArray[i],
        temp: tempArray[i],
        weathercode: codeArray[i],
    });
    }

    return displayArr;
	}

  // Display humidity, wind speed, and % precipitation
  todayInfo = () => {
    const { windspeed, winddirection } = this.props.current;
    return (
    <div className="mt-4 relative mb-4 w-full">
      <p className="text-sm font-semibold text-blue-600 flex items-center justify-center">
        <span className="pr-1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 8 56 42" width="20" height="20">
            <defs>
              <linearGradient id="a" x1="23.61" y1="21.85" x2="37.27" y2="45.52" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#3392d6"/>
                <stop offset="0.45" stopColor="#3392d6"/>
                <stop offset="1" stopColor="#2477b2"/>
              </linearGradient>
            </defs>
            <path d="M32,17c-6.09,9-10,14.62-10,20.09a10,10,0,0,0,20,0C42,31.62,38.09,26,32,17Z" stroke="#2885c7" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)">
              <animateTransform attributeName="transform" type="scale" values="1 1; 1 .9; 1 1" calcMode="spline" dur="5s" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1" repeatCount="indefinite"/>
            </path>
          </svg>
        </span>
        75%
      </p>
      <p className="text-sm flex xsm:ml-[12%] xsm:absolute xsm:w-72 mt-1">
        <span className="pr-4 m-auto xsm:m-0">Humidity: <span className="font-semibold">65%</span></span>
        <span className="m-auto xsm:m-0">Wind: <span className="font-semibold">{windspeed} {winddirection}</span></span>
      </p>
    </div>
   )};

  render () {
    const displayWeather = this.getDisplayArr().map((weatherItem, index) => {
      return (
        <li key={weatherItem.time} className={`flex items-center flex-col w-full md:w-[10%] sm:w-[20%] xsm:w-[45%] pb-3 ${index != 0 ? "pt-2" : null}`}>
          <p className={`text-sm dark:text-neutral-400 ${index == 0 ? "font-semibold dark:text-white" : "text=slate-500"}`}>{moment(weatherItem.time).format('h A')}</p>
          <div className={`text-sm ${index == 0 ? "w-16 h-16" : "w-10 h-10"}`} data-weathercode={weatherItem.weathercode} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
              <defs>
                <linearGradient id="a" x1="16.5" y1="19.67" x2="21.5" y2="28.33" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fbbf24"/>
                  <stop offset="0.45" stopColor="#fbbf24"/>
                  <stop offset="1" stopColor="#f59e0b"/>
                </linearGradient>
                <linearGradient id="b" x1="22.56" y1="21.96" x2="39.2" y2="50.8" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f3f7fe"/>
                  <stop offset="0.45" stopColor="#f3f7fe"/>
                  <stop offset="1" stopColor="#deeafb"/>
                </linearGradient>
              </defs>
              <circle cx="19" cy="24" r="5" stroke="#f8af18" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#a)"/>
              <path d="M19,15.67V12.5m0,23V32.33m5.89-14.22,2.24-2.24M10.87,32.13l2.24-2.24m0-11.78-2.24-2.24M27.13,32.13l-2.24-2.24M7.5,24h3.17M30.5,24H27.33" fill="none" stroke="#fbbf24" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2">
                <animateTransform attributeName="transform" type="rotate" values="0 19 24; 360 19 24" dur="45s" repeatCount="indefinite"/>
              </path>
              <path d="M46.5,31.5l-.32,0a10.49,10.49,0,0,0-19.11-8,7,7,0,0,0-10.57,6,7.21,7.21,0,0,0,.1,1.14A7.5,7.5,0,0,0,18,45.5a4.19,4.19,0,0,0,.5,0v0h28a7,7,0,0,0,0-14Z" stroke="#e6effc" strokeMiterlimit="10" strokeWidth="0.5" fill="url(#b)"/>
            </svg>
          </div>
          <p className={`text-sm ${index == 0 ? "text-[2.75rem] font-semibold -mr-4" : "text-xl -mt-1"}`}>{Math.trunc(weatherItem.temp)}&deg;</p>
          {index == 0 ? this.todayInfo() : null} 
        </li>
      )});

    return (
      <div role="hourly-weather" className="overflow-hidden px-5 py-4">
        <ul role="list" className="flex flex-row flex-wrap -mx-4 justify-around gap-4">
          {displayWeather}
        </ul>
      </div>
    );
  }
}