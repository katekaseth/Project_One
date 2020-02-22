import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FilterChips } from '../Chips';

export default ({setPage, filterState, updateFilterState}) => {
    const classes = useStyles();
    return (
        <Grid
            container
            className='search-page'
        >
            <Grid item>
                <SearchFilter filterState={filterState} updateFilterState={updateFilterState}/>
            </Grid>

            <Grid 
                xs 
                item 
                container 
                direction='column'
                className={classes.searchArea}
            >
                <Grid item>
                    <SearchBar setPage={setPage}/>
                </Grid>
                <Grid item className={classes.filterChips}>
                    <FilterChips 
                        filterState={filterState} 
                        updateFilterState={updateFilterState}
                    />
                    <SearchResults setPage={setPage}/>
                </Grid>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    searchArea: {
        marginLeft: '20px',
    },
    filterChips: {
        marginTop: '20px',
    }
});