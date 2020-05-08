import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FilterChips } from '../Chips';
import { STANDARDIZED_CATEOGRY_KEYS } from '../../stringConstants';

import { a_zSort, z_aSort, mostRecentSort, leastRecentSort } from './compareFunctions';

const SORT_VALUES = {
    A_Z: 'A_Z',
    Z_A: 'Z_A',
    MOST_RECENTLY_UPDATED: 'MOST_RECENTLY_UPDATED',
    LEAST_RECENTLY_UPDATED: 'LEAST_RECENTLY_UPDATED',
};

export default (props) => {
    const classes = useStyles();

    let expandedObject = null;
    const [expandedFilterGroups, setExpandedFilterGroups] = useState(expandedObject);

    const [sortedResults, setSortedResults] = useState(null);

    const changeFilterExpansion = (subjectKey) => {
        let temp = { ...expandedFilterGroups };
        temp[subjectKey] = !temp[subjectKey];
        setExpandedFilterGroups(temp);
    };

    useEffect(() => {
        if (props.filterState !== null && expandedFilterGroups === null) {
            expandedObject = {};
            Object.keys(props.filterState).forEach((subjectKey) => {
                expandedObject[subjectKey] =
                    Object.values(props.filterState[subjectKey]).includes(true) ||
                    subjectKey === 'Subject Area' ||
                    subjectKey === 'Tool Type';
            });
            setExpandedFilterGroups(expandedObject);
        }
        if (sortedResults === null && props.results !== null) {
            setSortedResults(props.results);
        }
    });

    const handleSortChange = (sortBy) => {
        if (sortBy === SORT_VALUES.A_Z) {
            setSortedResults(props.results.sort(a_zSort).slice(0));
        } else if (sortBy === SORT_VALUES.Z_A) {
            setSortedResults(props.results.sort(z_aSort).slice(0));
        } else if (sortBy === SORT_VALUES.MOST_RECENTLY_UPDATED) {
            setSortedResults(props.results.sort(mostRecentSort).slice(0));
        } else if (sortBy === SORT_VALUES.LEAST_RECENTLY_UPDATED) {
            setSortedResults(props.results.sort(leastRecentSort).slice(0));
        } else {
            setSortedResults(props.results);
        }
    };

    if (props.filterState === null || expandedFilterGroups === null) return <div></div>;

    return (
        <Grid container>
            <Grid xs={3} item>
                {expandedFilterGroups && (
                    <SearchFilter
                        expandedFilterGroups={expandedFilterGroups}
                        changeFilterExpansion={changeFilterExpansion}
                        {...props}
                    />
                )}
            </Grid>

            <Grid xs item container direction='column' className={classes.searchArea}>
                <SearchBar redirect={() => props.setPage.search()} {...props} />

                <Grid item container className={classes.filterChips}>
                    <Grid item container alignItems='flex-start'>
                        <Grid item xs={9}>
                            <FilterChipDisplay
                                nothingFound={props.results && props.results.length === 0}
                                numResults={props.results && props.results.length}
                                changeFilterExpansion={changeFilterExpansion}
                                {...props}
                            />
                        </Grid>
                        <Grid item xs>
                            <SortSelector handleSortChange={handleSortChange} />
                        </Grid>
                    </Grid>
                    <SearchResults
                        setPage={props.setPage}
                        results={sortedResults}
                        alertError={props.alertError}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

const SortSelector = ({ handleSortChange }) => {
    const classes = useStyles();
    const handleChange = (event) => {
        handleSortChange(event.target.value);
    };

    return (
        <Grid className={classes.sortSelector}>
            <FormControl className={classes.formControl}>
                <InputLabel>Sort By</InputLabel>
                <Select onChange={handleChange}>
                    <MenuItem value={SORT_VALUES.A_Z}>
                        <Typography variant='body2'>Title: A-Z</Typography>
                    </MenuItem>
                    <MenuItem value={SORT_VALUES.Z_A}>
                        <Typography variant='body2'>Title: Z-A</Typography>
                    </MenuItem>
                    <MenuItem value={SORT_VALUES.MOST_RECENTLY_UPDATED}>
                        <Typography variant='body2'>Most recently updated</Typography>
                    </MenuItem>
                    <MenuItem value={SORT_VALUES.LEAST_RECENTLY_UPDATED}>
                        <Typography variant='body2'>Least recently updated</Typography>
                    </MenuItem>
                </Select>
            </FormControl>
        </Grid>
    );
};

const FilterChipDisplay = (props) => {
    const { filterState } = props;
    const classes = useStyles();

    let displayingAll = [];
    Object.keys(filterState).forEach((subjectKey) => {
        if (!Object.values(filterState[subjectKey]).includes(true)) {
            displayingAll.push(
                <Grid
                    className={classes.link}
                    onClick={() => props.changeFilterExpansion(subjectKey)}
                    component='span'
                >
                    {STANDARDIZED_CATEOGRY_KEYS[subjectKey] === undefined
                        ? subjectKey
                        : STANDARDIZED_CATEOGRY_KEYS[subjectKey]}
                </Grid>,
                ',   ',
            );
        }
    });
    displayingAll.pop(); // remove trailing ,

    return (
        <Grid container direction='column'>
            <Grid item container direction='row' alignItems='center'>
                {Object.keys(filterState).length * 2 - 1 !== displayingAll.length && (
                    <Typography variant='body2' component='span' className={classes.filterLabel}>
                        Filtering on
                    </Typography>
                )}
                <FilterChips {...props} />
            </Grid>
            <Grid item className={classes.allResults}>
                {displayingAll.length !== 0 && (
                    <Typography variant='body2'>
                        Found {props.numResults} results. Displaying all options for {displayingAll}
                    </Typography>
                )}
            </Grid>
            {props.nothingFound && <NothingFound searchedTerms={props.searchedTerms} />}
        </Grid>
    );
};

const NothingFound = ({ searchedTerms }) => {
    const classes = useStyles();
    let message = 'Uh oh! No results found';
    let disclaimer =
        'Our search is still in beta, here are some tips to help you navigate in the meantime:';
    let help = ['Search with single word phrases', 'Use just one or two filters'];
    if (searchedTerms.length > 0) {
        message = `Uh oh! No results found for "${searchedTerms}"`;
    }
    return (
        <Grid className={classes.nothingFound}>
            <Typography variant='h6'>{message}</Typography>
            <Typography variant='body1'>{disclaimer}</Typography>
            <ul>
                {help.map((tip) => {
                    return (
                        <li>
                            <Typography variant='body1'>{tip}</Typography>
                        </li>
                    );
                })}
            </ul>
        </Grid>
    );
};

const useStyles = makeStyles({
    container: {
        height: '100%',
        backgroundColor: '#E5E5E5',
    },
    searchArea: {
        marginLeft: '20px',
    },
    filterChips: {
        marginTop: '20px',
    },
    filterLabel: {
        marginRight: '7px',
    },
    allResults: {
        marginTop: '7px',
        color: 'gray',
    },
    link: {
        textDecoration: 'underline',
        '&:hover': {
            cursor: 'pointer',
            color: '#4f4f4f',
        },
    },
    nothingFound: {
        marginTop: '30px',
    },
    sortSelector: {
        float: 'right',
        marginTop: '-10px',
    },
    formControl: {
        minWidth: '170px',
    },
});
