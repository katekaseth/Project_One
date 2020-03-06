import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@material-ui/core';

import { THEME } from './theme';
import App from './App';

function AppRouter() {
    return (
        <ThemeProvider theme={THEME}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    );
}

export default AppRouter;
