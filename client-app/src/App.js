import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { PAGES, SESSION } from './stringConstants';
import Navbar from './components/Navbar';
import LandingPage from './components/landingPage/LandingPage';
import SearchPage from './components/searchPage/SearchPage';
import ResultPage from './components/resultPage/ResultPage';
import LoginPage from './components/loginPage/LoginPage';
import BookmarkPage from './components/bookmarkPage/BookmarkPage';
import { getFiltersApi } from './api/getFilters';
import { searchEndpoint } from './api/search';
import { getBookmarksEndpoint } from './api/bookmarks';
import { ErrorDialog } from './components/Dialogs';
import { loginApi } from './api/login';

function App() {
    // Page route, / is root
    const [page, setPage] = useState('/');
    // Error set to null, set message if error
    const [error, setError] = useState(null);
    // What is currently being filtered on
    const [filterState, setFilterState] = useState(null);
    // Selected subject from landing page
    const [selectedSubject, setSelectedSubject] = useState('');
    // Terms the user has searched on
    const [searchedTerms, setSearchedTerms] = useState([]);
    // Search results
    const [results, setResults] = useState(null);
    // Bookmark results
    const [bookmarks, setBookmarks] = useState(null);
    // Selected result that a user views on result page
    const [selectedResult, setSelectedResult] = useState(null);
    const history = useHistory();

    // Fetches filters and calls /search for
    // results relating to that filter
    const fetchFilters = async () => {
        getFiltersApi()
            .then((response) => {
                buildFilterState(response.data);
            })
            .catch((err) => {
                alertError("Can't contact server");
            });
    };

    const fetchResults = async () => {
        searchEndpoint(filterState, searchedTerms)
            .then((response) => {
                // TODO: Want to parse and standardize the data ie documentID -> documentId, etc...
                setResults(response.data);
            })
            .catch((err) => {
                alertError("Couldn't fetch search results");
            });
    };

    const fetchBookmarks = async () => {
        getBookmarksEndpoint()
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch((err) => {
                alertError("Couldn't fetch bookmarks");
            });
    };

    const clearFilterState = () => {
        filterState !== null &&
            Object.keys(filterState).forEach((categoryKey) => {
                Object.keys(filterState[categoryKey]).forEach((filterKey) => {
                    filterState[categoryKey][filterKey] = false;
                });
            });
        setSearchedTerms([]);
        setFilterState(filterState);
    };

    const buildFilterState = (availableFilters) => {
        let tempFilterState = {};
        Object.keys(availableFilters).forEach((categoryKey) => {
            tempFilterState[categoryKey] = {};
            availableFilters[categoryKey].forEach((filterKey) => {
                if (selectedSubject === filterKey) {
                    tempFilterState[categoryKey][filterKey] = true;
                    availableFilters[categoryKey].forEach((filterKey) => {});
                } else {
                    tempFilterState[categoryKey][filterKey] = false;
                }
            });
        });
        setFilterState(tempFilterState);
    };

    const updateFilterState = (subjectKey, filterKey) => {
        let tempFilterState = { ...filterState };
        tempFilterState[subjectKey][filterKey] = !tempFilterState[subjectKey][filterKey];
        if (filterKey === selectedSubject) {
            setSelectedSubject('');
        }
        setFilterState(tempFilterState);
    };

    const updateSearchTerms = (searchTerms) => {
        setSearchedTerms(searchTerms.slice());
    };

    const clearFilterStateAndSearchTerms = () => {
        clearFilterState();
        setSearchedTerms([]);
    };

    const login = async (username, password) => {
        loginApi(username, password)
            .then((response) => {
                let sessionId = response.headers.authorization;
                sessionStorage.setItem(SESSION.SESSION_ID, sessionId);
                newSessionId(sessionId);
                setTimeout(() => expireSession(sessionId), 28800000); // Expire client session after 8 hours
                GLOBAL_ACTIONS.setPage.home();
            })
            .catch((err) => {
                alertError('There was an error loggin you in. Try again or contact site owners.');
            });
    };

    const alertError = (errorMessage) => {
        setError(`Error: ${errorMessage}`);
    };

    const GLOBAL_STATE = {
        page,
        filterState,
        searchedTerms,
        results,
        selectedResult,
        bookmarks,
    };

    const GLOBAL_ACTIONS = {
        setPage: {
            home: () => {
                clearFilterStateAndSearchTerms();
                setPage(PAGES.home);
                setResults(null);
                history.push(PAGES.home);
            },
            login: () => {
                clearFilterStateAndSearchTerms();
                setPage(PAGES.login);
                setResults(null);
                history.push(PAGES.login);
            },
            search: () => {
                // don't clear filterState
                // when going to search page
                setPage(PAGES.search);
                history.push(PAGES.search);
            },
            result: (resultId) => {
                // don't clear filterState
                // when going to result page
                localStorage.setItem('documentId', resultId);
                setSelectedResult(resultId);
                setPage(PAGES.result);
                history.push(PAGES.result);
            },
            bookmarks: () => {
                setPage(PAGES.bookmarks);
                history.push(PAGES.bookmarks);
                fetchBookmarks();
            },
        },
        clearFilterState,
        updateFilterState,
        updateSearchTerms: updateSearchTerms,
        setSelectedSubject: (subjectArea) => {
            if (filterState !== null && filterState['Subject Area'][subjectArea] !== undefined) {
                updateFilterState('Subject Area', subjectArea);
            } else if (filterState === null) {
                setSelectedSubject(subjectArea);
            }
        },
        login,
        alertError,
    };

    useEffect(() => {
        if (filterState === null) {
            fetchFilters();
        }
    }, []);

    useEffect(() => {
        // When searchedTerms or filterState is changed
        // kick of new search if they both aren't null
        // and we are also on the search page
        if (searchedTerms !== null && filterState !== null && page === PAGES.search) {
            fetchResults();
        }
    }, [searchedTerms, filterState]);

    if (sessionStorage.getItem(SESSION.SESSION_ID) === null) {
        return (
            <div>
                <ErrorDialog message={error} setError={setError} />
                <LoginPage login={login} />
            </div>
        );
    }

    return (
        <div className='app'>
            <Navbar {...GLOBAL_ACTIONS} transparent={page === PAGES.home} />
            <ErrorDialog message={error} setError={setError} />
            <Switch>
                <Route exact path={PAGES.home}>
                    <div className='landing-page-container'>
                        <LandingPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS} />
                    </div>
                </Route>
                <Route path={PAGES.search}>
                    <div className='search-page-container'>
                        <SearchPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS} />
                    </div>
                </Route>
                <Route path={PAGES.result}>
                    <div className='result-page-container'>
                        <ResultPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS} />
                    </div>
                </Route>
                <Route path={PAGES.login}>
                    <div className='login-page-container'>
                        <LoginPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS} />
                    </div>
                </Route>
                <Route path={PAGES.bookmarks}>
                    <div className='bookmark-page-container'>
                        <BookmarkPage {...GLOBAL_STATE} {...GLOBAL_ACTIONS} />
                    </div>
                </Route>
            </Switch>
        </div>
    );
}

const bc = new BroadcastChannel(SESSION.CHANNEL_NAME);
bc.onmessage = function (e) {
    if (e.data.messageType === SESSION.NEW_SESSION) {
        sessionStorage.setItem(SESSION.SESSION_ID, e.data.sessionId);
        window.location.reload();
    } else if (e.data.messageType === SESSION.EXPIRE_SESSION) {
        let sessionId = sessionStorage.getItem(SESSION.SESSION_ID);
        if (sessionId === e.data.sessionId) {
            sessionStorage.removeItem(SESSION.SESSION_ID);
            window.location.reload();
        }
    }
};

const newSessionId = (sessionId) => {
    bc.postMessage({
        messageType: SESSION.NEW_SESSION,
        sessionId: sessionId,
    });
};

const expireSession = (sessionId) => {
    bc.postMessage({
        messageType: SESSION.EXPIRE_SESSION,
        sessionId: sessionId,
    });
};

export default App;
