import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import './App.css';

import App from './App';

function AppRouter() {
  return (
    <Router>
		<App/>
    </Router>
  );
}

export default AppRouter;
