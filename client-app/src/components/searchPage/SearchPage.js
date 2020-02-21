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

export default (props) => {
    const [filterState, setFilterState] = useState(makeFilterState());

    const changeFilter = (subjectKey, filterKey) => {
        let tempFilterState = {...filterState};
        tempFilterState[subjectKey][filterKey] = !tempFilterState[subjectKey][filterKey];
        setFilterState(tempFilterState);
    }

    return (
        <Grid
            container
            className='search-page'
        >
            <Grid item>
                <SearchFilter filterState={filterState} changeFilter={changeFilter}/>
            </Grid>

            <Grid xs item container direction='column'>
                <Grid item>
                    <SearchBar {...props}/>
                </Grid>
                <Grid item>
                    <FilterChips filterState={filterState} changeFilter={changeFilter}/>
                    <SearchResults {...props}/>
                </Grid>
            </Grid>
        </Grid>
    );
};