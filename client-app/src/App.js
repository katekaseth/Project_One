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
import { getFiltersApi } from './api/getFilters';

function App() {
    // Page route, / is root
    const [page, setPage] = useState('/');
    // What is currently being filtered on
    const [filterState, setFilterState] = useState(null);
    // Selected subject from landing page
    const [selectedSubject, setSelectedSubject] = useState('');
    // Terms the user has searched on
    const [searchedTerms, setSearchedTerms] = useState([]);
    const history = useHistory();

    const fetchFilters = async () => {
        const response = await getFiltersApi();
        buildFilterState(response.data);
    }

    const clearFilterState = () => {
        filterState !== null && 
        Object.keys(filterState).forEach(categoryKey => {
            Object.keys(filterState[categoryKey]).forEach(filterKey => {
                filterState[categoryKey][filterKey] = false;
            });
        });
        setSearchedTerms('');
        setFilterState(filterState);
    };

    const buildFilterState = (availableFilters) => {
        let tempFilterState = {};
        Object.keys(availableFilters).forEach(categoryKey => {
            tempFilterState[categoryKey] = {};
            availableFilters[categoryKey].forEach(filterKey => {
                if (selectedSubject == filterKey) {
                    tempFilterState[categoryKey][filterKey] = true;
                } else {
                    tempFilterState[categoryKey][filterKey] = false;
                }
            })
        });
        setFilterState(tempFilterState);
    };

    const updateFilterState = (subjectKey, filterKey) => {
        let tempFilterState = {...filterState};
        tempFilterState[subjectKey][filterKey] = !tempFilterState[subjectKey][filterKey];
        setFilterState(tempFilterState);
    };


    const GLOBAL_STATE = {
        page,
        filterState,
        searchedTerms,
    };

    const GLOBAL_ACTIONS = {
        setPage: {
            home: () => {
                clearFilterState();
                setSearchedTerms([]);
                setPage(PAGES.home);
                history.push(PAGES.home);
            },
            login: () => {
                clearFilterState();
                setPage(PAGES.login);
                history.push(PAGES.login);
            },
            search: () => {
                // don't clear filterState
                // when going to search page
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
        clearFilterState,
        updateFilterState,
        setSearchedTerms,
        fetchFilters,
        setSelectedSubject: (subjectArea) => {
            if (filterState !== null && filterState['Subject Area'][subjectArea] !== undefined) {
                updateFilterState('Subject Area', subjectArea)
            } else if (filterState === null) {
                setSelectedSubject(subjectArea);
            }
        }
    };

    if (sessionStorage.getItem('sessionId') == null) {
        return (
            <LoginPage setPage={GLOBAL_ACTIONS.setPage}/>
        );
    }

    return (
        <div className='app'>
            <Navbar {...GLOBAL_ACTIONS} transparent={page === PAGES.home} />
            <Switch>
                <Route exact path={PAGES.home}>
                    <div className='landing-page-container'>
                        <LandingPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS}/>
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

export default App;
