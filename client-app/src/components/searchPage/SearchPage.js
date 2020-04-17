import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FilterChips } from '../Chips';

export default (props) => {
    const classes = useStyles();

    let expandedObject = {};
    if (props.filterState !== null) {
        Object.keys(props.filterState).forEach((subjectKey) => {
            expandedObject[subjectKey] =
                Object.values(props.filterState[subjectKey]).includes(true) ||
                subjectKey === 'Subject Area' ||
                subjectKey === 'Tool Type';
        });
    }

    const [expandedFilterGroups, setExpandedFilterGroups] = useState(expandedObject);

    const changeFilterExpansion = (subjectKey) => {
        let temp = { ...expandedFilterGroups };
        temp[subjectKey] = !temp[subjectKey];
        setExpandedFilterGroups(temp);
    };

    if (props.filterState === null) return <div></div>;

    return (
        <Grid container>
            <Grid xs={3} item>
                <SearchFilter
                    expandedFilterGroups={expandedFilterGroups}
                    changeFilterExpansion={changeFilterExpansion}
                    {...props}
                />
            </Grid>

            <Grid xs item container direction='column' className={classes.searchArea}>
                <SearchBar {...props} />

                <Grid item container className={classes.filterChips}>
                    <FilterChipDisplay changeFilterExpansion={changeFilterExpansion} {...props} />
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
});
