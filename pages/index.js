import React, { Component } from 'react';

import Head from 'next/head'
import Alert from '../components/Alert'
import Error from '../components/Error'
import Hourly from '../components/Hourly'
import Daily from '../components/Daily'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: {},
      DataisLoaded: false,
      errorMessage: "",
      alertTitle: "Beach Hazards Statement",
      alertStatement: "This is the extended statement that would show for beach hazards.",
      celsius: true,
    };
  }

  // Fetch initial data
  componentDidMount() {
    this.fetchData();
  }

  // Fetch data on celsius change
  componentDidUpdate(prevProps, prevState) {
    if (this.state.celsius !== prevState.celsius) {
      this.fetchData();
    }
 }

  // Fetch from api
  fetchData = () => {
    fetch(this.weatherUrl())
    .then(response => {
      if (!response.ok) { throw response }
      return response.json()
    })
    .then(weatherData => this.setState({ 
      weather: weatherData,
      DataisLoaded: true
    }))
    .catch( error => {
      error.text().then(message => this.setState({
        ...this.state,
        errorMessage: message
      }))
    })
  }

  // Construct weather url with units. Defaults to celsius and kph.
  weatherUrl = () => {
    let weatherUrl = "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&timezone=auto&current_weather=true&hourly=temperature_2m,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset";

    if (!this.state.celsius) {
      const tempUnit = "fahrenheit";
      const windUnit = "mph";
      weatherUrl += `&windspeed_unit=${windUnit}`+`&temperature_unit=${tempUnit}`;
    }

    return weatherUrl;
  }

  // Update celsius
  toggleCelsius = () => {
    this.setState((prevState) => {
      return { celsius: !prevState.celsius };
    });
  }

  render () {
    // Loading spinner
    const loading = (<div className="flex justify-center h-20" role="status">
      <svg aria-hidden="true" className="self-center mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
      </div>
    )

    // Translate weathercode values into human readable format
    const weatherInterpreter = {
      0: "Clear Sky",
      1: "Mainly Clear",
      2: "Partly Cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing Rime Fog",
      51: "Light Drizzle",
      53: "Moderate Drizzle",
      55: "Dense Intensity",
      56: "Light Freezing Drizzle",
      57: "Dense Freezing Drizzle",
      61: "Slight Rain",
      63: "Moderate Rain",
      65: "Heavy Rain",
      66: "Light Freezing Rain",
      67: "Heavy Freezing Rain",
      71: "Slight Snow",
      73: "Moderate Snow",
      75: "Heavy Snow",
      77: "Snow Grains",
      80: "Slight Rain Showers", 
      81: "Moderate Rain Showers",
      82: "Violent Rain Showers",
      85: "Slight Snow Showers",
      86: "Heavy Snow Showers",
      95: "Moderate Thunderstorm",
      96: "Thunderstorm with Light Hail",
      99: "Thunderstorm with Heavy Hail",
    }

    const { DataisLoaded, weather, errorMessage, alertTitle, alertStatement, celsius } = this.state;

    // Display error if data doesn't load
    if (errorMessage) {
      return <Error message={errorMessage} />
    } else if (!DataisLoaded) {
      return loading;
    }

    return (
      <div className="flex justify-center text-slate-800 dark:text-slate-200 dark:bg-neutral-900">
        <Head>
          <title>Weather App</title>
          <meta name="description" content="HappyCo Weather App code challenge" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="m-8 shadow-sm border border-slate-200 rounded-lg w-full max-w-screen-lg dark:bg-neutral-800 dark:border-neutral-700">
          { alertTitle ? <Alert 
              title="Beach Hazards Statement"
              statement="This is the extended statement that would show for beach hazards."
            /> : null 
          }
          <div role="title-units" className="flex mx-5 mt-5">
            <div className="flex-auto">
              <h1 className="text-2xl font-semibold">{weatherInterpreter[weather.current_weather.weathercode]}</h1>
              <h2>New York, NY</h2>
            </div>
            <div className="flex-none w-14 text-right text-sm">
              <a href="#" className={`pr-1 ${celsius ? "border-b-2 font-semibold border-slate-800 dark:border-white" : "text-slate-500 hover:border-b-2 hover:font-semibold "}`} onClick={this.toggleCelsius}>&deg;C</a>
              <a href="#" className={`${!celsius ? "border-b-2 font-semibold border-slate-800 dark:border-white" : "text-slate-500 hover:border-b-2 hover:font-semibold "}`} onClick={this.toggleCelsius}>&deg;F</a>
            </div>
          </div>
          <Hourly 
            hourly = {weather.hourly}
            current = {weather.current_weather}
          />
          <Daily 
            daily = {weather.daily}
          />
        </main>
      </div>
    )
  }
}
