import { useState, useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import countriesJson from "./countries.json"
import TopPage from './pages/TopPage';
import WorldPage from "./pages/WorldPage";
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
  const [allCountriesData, setAllCountriesData] = useState([]);

  const getCountryData = () => {
      fetch(`https://api.covid19api.com/country/${country}`)
      .then(res => res.json())
      .then(data => {
        setCountryData({
          data: data[data.length -1].Date,
          newConfirmed: data[data.length -1].Confirmed - data[data.length -2].Confirmed,
          totalConfirmed: data[data.length -1].Confirmed,
          newRecovered: data[data.length -1].Recovered - data[data.length -2].Recovered,
          totalRecovered: data[data.length -1].Recovered,
        });
      })
  }
  const getAllCountriesData = () => {
    fetch("https://api.covid19api.com/summary")
    .then(res => res.json())
    .then(data => setAllCountriesData(data.Countries))
  }
  useEffect(() => {
    getAllCountriesData();
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <TopPage countriesJson={countriesJson} setCountry={setCountry} getCountryData={getCountryData} countryData={countryData} />
        </Route>
        <Route exact path="/world">
          <WorldPage allCountriesData={allCountriesData} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
