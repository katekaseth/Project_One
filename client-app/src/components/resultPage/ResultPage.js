import React, { useState, useEffect } from 'react';
import { Grid, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { ResultOverview } from './ResultOverview';
import { ResultMetadata } from './ResultMetadata';
import { getResultEndpoint } from '../../api/documents';
import { PAGES, STANDARDIZED_CATEOGRY_KEYS } from '../../stringConstants';

import homeIcon from '../../icons/svg/home.svg';

export default ({ previousPage, filterState, setPage, alertError, addRecent }) => {
    const [result, setResult] = useState(null);
    const classes = useStyles();

    const selectedResult = window.location.pathname.replace(PAGES.result, '').replace('/', '');

    const fetchResult = async (selectedResult) => {
        getResultEndpoint(selectedResult)
            .then((response) => {
                setResult(response.data);
            })
            .catch((err) => {
                alertError('Error fetching result.', true);
            });
    };

    useEffect(() => {
        if (selectedResult !== '') {
            fetchResult(selectedResult);
        }
    }, []);

    if (selectedResult === '' || result === null)
        return (
            <Typography variant='body1'>
                Nothing selected, go back to{' '}
                <Grid className={classes.link} component='span' onClick={() => setPage.search()}>
                    search page
                </Grid>{' '}
                to find more results!
            </Typography>
        );

    addRecent(result.documentID);
    return (
        <Grid>
            <Grid>
                <NavPath
                    previousPage={previousPage}
                    filterState={filterState}
                    setPage={setPage}
                    resultTitle={result.title}
                />
            </Grid>
            <Grid className='result-overview-container'>
                <ResultOverview result={result} alertError={alertError} />
            </Grid>
            <Grid className='result-metadata-container'>
                <ResultMetadata result={result} />
            </Grid>
        </Grid>
    );
};

const NavPath = ({ previousPage, filterState, searchPath, setPage, resultTitle }) => {
    const BOOKMARK_PAGE = 'Bookmark Page';
    const getSearchPath = (filterState) => {
        if (filterState === null) {
            return 'Search';
        }

        let filters = [];
        Object.keys(filterState).forEach((subjectKey) => {
            Object.keys(filterState[subjectKey]).forEach((filterKey) => {
                filterState[subjectKey][filterKey] &&
                    filters.push(
                        STANDARDIZED_CATEOGRY_KEYS[subjectKey] === undefined
                            ? filterKey.toUpperCase().slice(0, 1) + filterKey.slice(1)
                            : `${STANDARDIZED_CATEOGRY_KEYS[subjectKey]}: ${
                                  filterKey.toUpperCase().slice(0, 1) + filterKey.slice(1)
                              }`,
                    );
            });
        });
        if (filters.length === 0) {
            return 'Search Page';
        } else {
            return filters.join(', ') + '...';
        }
    };

    let path = BOOKMARK_PAGE;
    if (previousPage === PAGES.bookmarks) {
        path = 'Bookmark Page';
    } else {
        path = getSearchPath(filterState);
    }
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item className={classes.item}>
                <CardMedia
                    className={classes.icon}
                    src={homeIcon}
                    component='img'
                    onClick={() => setPage.home()}
                />
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography
                    variant='body2'
                    onClick={() =>
                        path === BOOKMARK_PAGE ? setPage.bookmarks() : setPage.search()
                    }
                    className={classes.link}
                >
                    {path}
                </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{resultTitle}</Typography>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    link: {
        cursor: 'pointer',
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
    },
    icon: {
        cursor: 'pointer',
        width: '20px',
        height: '20px',
    },
});
