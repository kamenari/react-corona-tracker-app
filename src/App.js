import { useState } from "react";
import countriesJson from "./countries.json"
import TopPage from './pages/TopPage';
import './App.css';

function App() {
  const [country, setCountry] = useState("");
  const [countryData, setCountryData] =useState({
    data: "",
    newConfirmed: "",
    totalConfirmed: "",
    newRecovered: "",
    totalRecovered: "",
  });
  const getCountryData = () => {
      fetch(`https://api.covid19api.com/country/${country}`)
      .then(res => res.json())
      .then(data => {
        setCountryData({
          data: data[data.length -1].Data,
          newConfirmed: data[data.length -1].Confirmed - data[data.length -2].Confirmed,
          totalConfirmed: data[data.length -1].Confirmed,
          newRecovered: data[data.length -1].Recovered - data[data.length -2].Recovered,
          totalRecovered: data[data.length -1].Recovered,
        });
      })
  }
  return (
    <div>
      <TopPage countriesJson={countriesJson} setCountry={setCountry} getCountryData={getCountryData} />
    </div>
  );
}

export default App;
