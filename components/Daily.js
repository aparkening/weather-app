import React, { Component } from 'react'
import moment from 'moment';

export default class Daily extends Component {
  render () {
    const displayWeather = this.props.daily.time.map((weatherItem, index) => {
      return (
        <li key={`daily-${weatherItem}`} className={`first:rounded-bl-lg last:rounded-br-lg dark:bg-neutral-800 dark:border-neutral-700 flex items-center flex-col border-t pt-2 pb-3  ${index == 0 ? "border-slate-800 dark:border-slate-400 dark:bg-neutral-700" : "bg-gray-50"}`}>
          <p className="text-black dark:text-white text-sm">{moment(this.props.daily.time[index]).format('ddd')}</p>
          <div className="w-10 h-10" data-weathercode={this.props.daily.weathercode[index]}>
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
          <p className="text-md -mt-1">{Math.trunc(this.props.daily.temperature_2m_max[index])}&deg;</p>   
          <p className="text-sm text-slate-500 dark:text-neutral-400">{Math.trunc(this.props.daily.temperature_2m_min[index])}&deg;</p>  
        </li>
    )});

    return (
      <div role="daily-weather">
        <ul role="list" className="grid md:grid-cols-7 sm:grid-cols-4 xsm:grid-cols-2 divide-x content-around gap-0">
        {displayWeather}
        </ul>
      </div>
    )
  }
}