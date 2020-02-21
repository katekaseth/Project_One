import React, { useState } from 'react';
import {
    Switch,
    Route,
    useHistory,
} from 'react-router-dom';

import { PAGES } from './stringConstants';
import Navbar from './components/Navbar';
import LandingPage from './components/landingPage/LandingPage';
import SearchPage from './components/searchPage/SearchPage';
import ResultPage from './components/resultPage/ResultPage';

function App() {
    const [page, setPage] = useState('/');
    const history = useHistory();

    const GLOBAL_STATE = {
        page: page,
    };

    const GLOBAL_ACTIONS = {
        setPage: (page) => {
            setPage(page);
            history.push(page);
        },
    };

  return (
    <div className='app'> 
        <Navbar {...GLOBAL_ACTIONS} transparent={page === PAGES.home} />
        <Switch>
            <Route exact path={PAGES.home}>
                <div className='landing-page-container'>
                    <LandingPage {...GLOBAL_ACTIONS}/>
                </div>
            </Route>
            <Route path={PAGES.search}>
                <SearchPage {...GLOBAL_ACTIONS}/>
            </Route>
            <Route path={PAGES.result}>
                <ResultPage {...GLOBAL_ACTIONS}/>
            </Route> 
        </Switch>
    </div>
  );
}

export default App;
