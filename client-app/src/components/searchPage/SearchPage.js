import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FILTER_OPTIONS } from '../../stringConstants';
import { FilterChips } from '../Chips';

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

export default ({setPage, filterState, updateFilterState}) => {

    return (
        <Grid
            container
            className='search-page'
        >
            <Grid item>
                <SearchFilter filterState={filterState} updateFilterState={updateFilterState}/>
            </Grid>

            <Grid xs item container direction='column'>
                <Grid item>
                    <SearchBar setPage={setPage}/>
                </Grid>
                <Grid item>
                    <FilterChips filterState={filterState} updateFilterState={updateFilterState}/>
                    <SearchResults setPage={setPage}/>
                </Grid>
            </Grid>
        </Grid>
    );
};