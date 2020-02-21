import React from "react";
import "../App.css";
import { PAGES } from '../stringConstants';

import era_logo from "../icons/era_logo.png";

export default function Navbar({setPage, transparent}) {
    let className = transparent ? 'transparent' : '';
    return (
        <div className={`navigation-bar ${className}`}>
            <img onClick={() => setPage(PAGES.home)} id="nav-logo" src={era_logo}></img>
            <ul>
                <li>Help</li>
                <li onClick={() => setPage(PAGES.search)}>Search</li>
                <li>Bookmarks</li>
                <li onClick={() => setPage(PAGES.home)}>Home</li>
            </ul>
        </div>
    );
}
