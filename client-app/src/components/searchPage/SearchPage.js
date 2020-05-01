import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FilterChips } from '../Chips';

export default (props) => {
    const classes = useStyles();

    let expandedObject = null;
    const [expandedFilterGroups, setExpandedFilterGroups] = useState(expandedObject);

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
    });

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
                    <FilterChipDisplay
                        nothingFound={props.results && props.results.length === 0}
                        changeFilterExpansion={changeFilterExpansion}
                        {...props}
                    />
                    <SearchResults {...props} />
                </Grid>
            </Grid>
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
                    {subjectKey}
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
                        Displaying all results for {displayingAll}
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
});
