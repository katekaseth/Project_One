import React from "react";
import "./App.css";

import Navbar from "./components/navbar";
import LandingPage from "./landing_page";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <LandingPage></LandingPage>
    </div>
  );
}

export default App;
