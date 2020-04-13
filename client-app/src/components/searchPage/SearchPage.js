import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid, Typography } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FilterChips } from '../Chips';

export default (props) => {
    const classes = useStyles();
    if (props.filterState === null) return <div></div>;
    return (
        <Grid container>
            <Grid xs={3} item>
                <SearchFilter {...props} />
            </Grid>

            <Grid xs item container direction='column' className={classes.searchArea}>
                <SearchBar {...props} />

                <Grid item container className={classes.filterChips}>
                    <FilterChipDisplay {...props} />
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
    let total = 0;
    Object.keys(filterState).forEach((subjectKey) => {
        if (!Object.values(filterState[subjectKey]).includes(true)) {
            displayingAll.push(subjectKey);
        }
        total++;
    });

    return (
        <Grid container direction='column'>
            <Grid item container direction='row' alignItems='center'>
                {total !== displayingAll.length && (
                    <Typography variant='body2' component='span' className={classes.filterLabel}>
                        Filtering on
                    </Typography>
                )}
                <FilterChips {...props} />
            </Grid>
            <Grid item className={classes.allResults}>
                {displayingAll.length !== 0 && (
                    <Typography variant='body2'>
                        Displaying all results for {displayingAll.join(', ')}
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
});
