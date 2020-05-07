import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { PAGES, SESSION, RECENTS } from './stringConstants';
import Navbar from './components/Navbar';
import LandingPage from './components/landingPage/LandingPage';
import SearchPage from './components/searchPage/SearchPage';
import ResultPage from './components/resultPage/ResultPage';
import LoginPage from './components/loginPage/LoginPage';
import BookmarkPage from './components/bookmarkPage/BookmarkPage';
import { getFiltersApi } from './api/getFilters';
import { searchEndpoint, searchBookmarkEndpoint } from './api/search';
import { getResultEndpoint } from './api/documents';
import { getBookmarksEndpoint } from './api/bookmarks';
import { ErrorDialog } from './components/Dialogs';
import { loginApi, pingApi, createAccountApi, signOutApi } from './api/login';
import { getRecentsEndpoint } from './api/recents';
import { Typography, makeStyles } from '@material-ui/core';
import { version } from '../package.json';

function App() {
    // Page route, / is root
    const [page, setPage] = useState('/');
    // Previous page, used in bread crumbs on /result only
    const [previousPage, setPreviousPage] = useState(null);
    // Error set to null, set message if error
    const [error, setError] = useState(null);
    // What is currently being filtered on
    const [filterState, setFilterState] = useState(null);
    // Selected subject from landing page
    const [selectedSubject, setSelectedSubject] = useState('');
    // Terms the user has searched on
    const [searchedTerms, setSearchedTerms] = useState([]);
    // Terms the user has searched on in bookmarks
    const [searchedBookmarkTerms, setSearchedBookmarkTerms] = useState([]);
    // Search results
    const [results, setResults] = useState(null);
    // Search result (singular)
    const [result, setResult] = useState(null);
    // Bookmark results
    const [bookmarks, setBookmarks] = useState(null);
    // Recents result
    const [recents, setRecents] = useState(null);
    const history = useHistory();
    const classes = useStyles();

    // Fetches filters and calls /search for
    // results relating to that filter
    const fetchFilters = async () => {
        getFiltersApi()
            .then((response) => {
                buildFilterState(response.data);
            })
            .catch((err) => {
                alertError("Can't contact server", true);
            });
    };

    const fetchResults = async () => {
        searchEndpoint(filterState, searchedTerms)
            .then((response) => {
                // TODO: Want to parse and standardize the data ie documentID -> documentId, etc...
                setResults(response.data);
            })
            .catch((err) => {
                alertError("Couldn't fetch search results", true);
            });
    };

    const fetchBookmarkResults = async () => {
        searchBookmarkEndpoint(searchedBookmarkTerms)
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch((err) => {
                alertError("Couldn't fetch search results", true);
            });
    };

    const fetchBookmarks = async () => {
        getBookmarksEndpoint()
            .then((response) => {
                setBookmarks(response.data);
            })
            .catch((err) => {
                alertError("Couldn't fetch bookmarks", true);
            });
    };

    const fetchRecents = async () => {
        let documentIds = localStorage.getItem(RECENTS);
        if (documentIds !== null) {
            getRecentsEndpoint(documentIds)
                .then((response) => {
                    setRecents(response.data);
                })
                .catch((err) => {
                    alertError("Couldn't fetch recents", true);
                });
        } else {
            setRecents(null);
        }
    };

    const fetchResult = async () => {
        const selectedResult = window.location.pathname.replace(PAGES.result, '').replace('/', '');

        getResultEndpoint(selectedResult)
            .then((response) => {
                setResult(response.data);
            })
            .catch((err) => {
                alertError('Error fetching result.', true);
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
        sessionStorage.setItem(SESSION.AVAILABLE_FILTERS, JSON.stringify(tempFilterState));
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

    const updateSearchBookmarkTerms = (searchTerms) => {
        setSearchedBookmarkTerms(searchTerms);
    };

    const clearFilterStateAndSearchTerms = () => {
        clearFilterState();
        setSearchedTerms([]);
        setSearchedBookmarkTerms([]);
    };

    const addRecent = (documentId) => {
        // Last element is newest!
        const NUM_RECENTS_SAVED = 10;
        let recents = JSON.parse(localStorage.getItem(RECENTS));
        if (recents === null) {
            recents = [];
        }
        if (recents[recents.length - 1] !== documentId) {
            if (recents.includes(documentId)) {
                let index = recents.indexOf(documentId);
                recents.splice(index, 1);
            }
            recents.push(documentId);
            if (recents.length > NUM_RECENTS_SAVED) {
                recents.splice(0, 1);
            }
            localStorage.setItem(RECENTS, JSON.stringify(recents));

            fetchRecents();
        }
    };

    const login = async (username, password) => {
        loginApi(username, password)
            .then((response) => {
                let sessionId = response.headers.authorization;
                sessionStorage.setItem(SESSION.SESSION_ID, sessionId);
                let username = response.data.userName;
                sessionStorage.setItem(SESSION.USERNAME, username);
                GLOBAL_ACTIONS.setPage.home();
            })
            .catch((err) => {
                // Uses setError directly so it doesn't ping
                if (err.response.status === 401) {
                    setError('Username or password is incorrect, please try again.');
                } else {
                    setError('There was an error loggin you in. Please contact site owners.');
                }
            });
    };

    const createAccount = async (username, password, passwordConf) => {
        createAccountApi(username, password, passwordConf)
            .then((response) => {
                let sessionId = response.headers.authorization;
                sessionStorage.setItem(SESSION.SESSION_ID, sessionId);
                let username = response.data.userName;
                sessionStorage.setItem(SESSION.USERNAME, username);
                GLOBAL_ACTIONS.setPage.home();
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    alertError('Invalid new user. Make sure passwords match.', false);
                } else {
                    alertError(
                        'There was an error creating an account. Please contact site owners.',
                        false,
                    );
                }
            });
    };

    const signOut = async () => {
        signOutApi()
            .then((response) => {
                sessionStorage.removeItem(SESSION.SESSION_ID);
                sessionStorage.removeItem(SESSION.USERNAME);
                GLOBAL_ACTIONS.setPage.login();
            })
            .catch((err) => {
                alertError(
                    'There was an error signing you out. Try again or close window to sign out.',
                    false,
                );
            });
    };

    const alertError = (errorMessage, ping) => {
        if (ping) {
            pingApi()
                .then((response) => {
                    setError(errorMessage);
                })
                .catch((err) => {
                    sessionStorage.removeItem(SESSION.SESSION_ID);
                    sessionStorage.removeItem(SESSION.USERNAME);
                    setError(SESSION.SESSION_EXPIRED_MESSAGE);
                });
        } else {
            setError(errorMessage);
        }
    };

    const GLOBAL_STATE = {
        page,
        filterState,
        searchedTerms,
        searchedBookmarkTerms,
        results,
        bookmarks,
        recents,
        result,
    };

    const GLOBAL_ACTIONS = {
        setPage: {
            home: () => {
                // clear filterState
                clearFilterStateAndSearchTerms();
                setPage(PAGES.home);
                setResults(null);
                history.push(PAGES.home);
            },
            login: () => {
                // clear filterState
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
                setPreviousPage(page);
                setPage(PAGES.result + '/' + resultId);
                history.push(PAGES.result + '/' + resultId);
            },
            bookmarks: () => {
                // clear filterState
                clearFilterStateAndSearchTerms();
                setPage(PAGES.bookmarks);
                history.push(PAGES.bookmarks);
            },
            recents: () => {
                // clear filterState
                clearFilterStateAndSearchTerms();
                setPage(PAGES.recents);
                history.push(PAGES.recents);
            },
            account: () => {
                // clear filterState
                clearFilterStateAndSearchTerms();
                setPage(PAGES.account);
                history.push(PAGES.account);
            },
        },
        clearFilterState,
        updateFilterState,
        updateSearchTerms: updateSearchTerms,
        updateSearchBookmarkTerms: updateSearchBookmarkTerms,
        setSelectedSubject: (subjectArea) => {
            if (filterState !== null && filterState['Subject Area'][subjectArea] !== undefined) {
                updateFilterState('Subject Area', subjectArea);
            } else if (filterState === null) {
                setSelectedSubject(subjectArea);
            }
        },
        login,
        createAccount,
        alertError,
        signOut,
        addRecent,
    };

    useEffect(() => {
        if (filterState === null && sessionStorage.getItem(SESSION.AVAILABLE_FILTERS) === null) {
            fetchFilters();
        } else if (filterState === null) {
            setFilterState(JSON.parse(sessionStorage.getItem(SESSION.AVAILABLE_FILTERS)));
        }
        if (recents === null) {
            fetchRecents();
        }
    }, []);

    useEffect(() => {
        if (page !== window.location.pathname) {
            setPage(window.location.pathname);
        }
    });

    useEffect(() => {
        // When searchedTerms or filterState is changed
        // kick of new search if they both aren't null
        // and we are also on the search page
        if (searchedTerms !== null && filterState !== null && page === PAGES.search) {
            fetchResults();
        }
    }, [searchedTerms, filterState]);

    useEffect(() => {
        if (searchedBookmarkTerms !== null && page === PAGES.bookmarks) {
            fetchBookmarkResults();
        }
    }, [searchedBookmarkTerms]);

    useEffect(() => {
        if (page === PAGES.search) {
            fetchResults();
        }

        if (page === PAGES.bookmarks) {
            fetchBookmarks();
        }

        if (page.startsWith(PAGES.result)) {
            fetchResult();
        }
    }, [page]);

    useEffect(() => {
        if (result !== null) {
            addRecent(result.documentID);
        }
    }, [result]);

    if (sessionStorage.getItem(SESSION.SESSION_ID) === null) {
        return (
            <div>
                <ErrorDialog {...GLOBAL_ACTIONS} message={error} setError={setError} />
                <LoginPage login={login} createAccount={createAccount} />
            </div>
        );
    }

    return (
        <div className='app'>
            <Navbar {...GLOBAL_ACTIONS} {...GLOBAL_STATE} transparent={page === PAGES.home} />
            <ErrorDialog {...GLOBAL_ACTIONS} message={error} setError={setError} />
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
                <Route path={new RegExp(`${PAGES.result}$|${PAGES.result}\/`)}>
                    <div className='result-page-container'>
                        <ResultPage
                            previousPage={previousPage}
                            {...GLOBAL_STATE}
                            {...GLOBAL_ACTIONS}
                        />
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
            <Typography className={classes.version}>v{version}</Typography>
        </div>
    );
}

const useStyles = makeStyles({
    version: {
        zIndex: 100,
        position: 'fixed',
        right: '0px',
        bottom: '0px',
        color: 'gray',
        fontSize: '7pt',
    },
});

export default App;
