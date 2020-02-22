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
import LoginPage from './components/loginPage/LoginPage';
import { FILTER_OPTIONS } from './stringConstants';

function App() {
    const [page, setPage] = useState('/');
    const [filterState, setFilterState] = useState(makeFilterState());
    const history = useHistory();

    const GLOBAL_STATE = {
        page,
        filterState,
    };

    const GLOBAL_ACTIONS = {
        setPage: {
            home: () => {
                setFilterState(makeFilterState());
                setPage(PAGES.home);
                history.push(PAGES.home);
            },
            login: () => {
                setFilterState(makeFilterState());
                setPage(PAGES.login);
                history.push(PAGES.login);
            },
            search: () => {
                // don't clear filterState 
                // when going to result page
                if (page !== PAGES.result) {
                    setFilterState(makeFilterState());
                }
                setPage(PAGES.search);
                history.push(PAGES.search);
            },
            result: () => {
                // don't clear filterState 
                // when going to result page
                setPage(PAGES.result);
                history.push(PAGES.result);
            },
        },
        clearFilterState: () => {
            setFilterState(makeFilterState());
        },
        updateFilterState: (subjectKey, filterKey) => {
            let tempFilterState = {...filterState};
            tempFilterState[subjectKey][filterKey] = !tempFilterState[subjectKey][filterKey];
            setFilterState(tempFilterState);
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
                <div className='search-page-container'>
                    <SearchPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS}/>
                </div>
            </Route>
            <Route path={PAGES.result}>
                <div  className='result-page-container'>
                    <ResultPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS}/>
                </div>
            </Route> 
            <Route path={PAGES.login}>
                <LoginPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS}/>
            </Route> 
        </Switch>
    </div>
  );
}

const makeFilterState = () => {
    let filterState = {};
    Object.keys(FILTER_OPTIONS).forEach(subjectKey => {
        filterState[subjectKey] = {};
        Object.keys(FILTER_OPTIONS[subjectKey].filters).forEach(filterKey => {
            filterState[subjectKey][filterKey] = false;
        });
    });
    return filterState;
};

export default App;
