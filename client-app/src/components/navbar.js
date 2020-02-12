import React from "react";
import "../App.css";
import era_logo from "../icons/era_logo.png";

export default function Navbar() {
  return (
    <div className="navigation-bar">
      <div id="nav-container">
        <img id="nav-logo" src={era_logo}></img>

        <ul>
          <li>Help</li>
          <li>Search</li>
          <li>Bookmarks</li>
          <li>Home</li>
        </ul>
      </div>
    </div>
  );
}
