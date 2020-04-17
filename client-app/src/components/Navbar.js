import React from 'react';
import '../App.css';

import era_logo from '../icons/era_logo.png';

export default ({ setPage, transparent }) => {
    let className = transparent ? 'transparent' : '';

    return (
        <div className={`navigation-bar ${className}`}>
            <img
                alt="UW ERA logo"
                onClick={() => setPage.home()}
                id="nav-logo"
                src={era_logo}
            ></img>
            <ul>
                <li onClick={() => setPage.login()}>Login</li>
                <li onClick={() => setPage.search()}>Search</li>
                <li onClick={() => setPage.bookmarks()}>Bookmarks</li>
                <li onClick={() => setPage.home()}>Home</li>
            </ul>
        </div>
    );
};
