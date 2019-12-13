import React from 'react';
import './App.css';
import Weather from "./components/weather.component";
import 'bootstrap/dist/css/bootstrap.min.css';

import Form from "./components/form.component";

const API_KEY = "a578778cb5f9e0f37c867797ed516b6f"
 
class App extends React.Component{
  constructor(){
    super();
    this.state = {
      city:undefined,
      country:undefined,
      temp_max:undefined,
      temp_min:undefined,
      celcius:undefined,
      description:"",
      error:false
    };
  }
  convrtCelsius(temp){
    let celv = Math.floor(temp-273.15);
    return celv;
  }
  getWeather = async(e) => {
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    if(city&&country){
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}
            &appid=${API_KEY}`);
    const response = await api_call.json();
    console.log(response)
    this.setState(
      {
        city:`${response.name},${response.sys.country}`,
        celsius:this.convrtCelsius(response.main.temp),
        temp_max:this.convrtCelsius(response.main.temp_max),
        temp_min:this.convrtCelsius(response.main.temp_min),
        description:response.weather[0].description,
        error:false
      }
    );
    }
    else{
      this.setState({error:true});
    }

  };
  
  render(){
    return(
      <div className = "App">
       <Form loadweather={this.getWeather} error={this.state.error}/>
       <Weather city={this.state.city} 
       country={this.state.country} 
       temp_celsius={this.state.celsius}
       temp_max={this.state.temp_max}
       temp_min={this.state.temp_min}
       description={this.state.desription}
       />
      </div>
    )
  }
}

export default App;
