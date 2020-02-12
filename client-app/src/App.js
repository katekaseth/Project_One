import React from "react";
import "./App.css";

import Navbar from "./components/navbar";
//import LandingPage from "./landing_page";
import LandingPage from './components/landingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <LandingPage/>
    </div>
  );
}

export default App;
