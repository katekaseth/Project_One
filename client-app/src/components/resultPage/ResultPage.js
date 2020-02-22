import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { ResultOverview } from './ResultOverview';
import { ResultMetadata } from './ResultMetadata';
import { FILTER_OPTIONS } from '../../stringConstants';

export default ({filterState, setPage}) => {
    return (
        <Grid>
            <Grid>
                <NavPath searchPath={getSearchPath(filterState)} setPage={setPage}/>
            </Grid>
            <Grid className='result-overview-container'>
                <ResultOverview/>
            </Grid>
            <Grid className='result-metadata-container'>
                <ResultMetadata/>
            </Grid>
        </Grid>
    );
};

const getSearchPath = (filterState) => {
    let filters = [];
    Object.keys(filterState).forEach(subjectKey => {
        Object.keys(filterState[subjectKey]).forEach(filterKey => {
            filterState[subjectKey][filterKey] && filters.push(FILTER_OPTIONS[subjectKey].filters[filterKey]);
        });
    });
    if (filters.length === 0) {
        return 'Search';
    } else {
        return filters.join(',') + '...'
    }
}

const NavPath =  ({searchPath, setPage}) => {
    return (
        <Grid container>
            <Grid item>
                <Typography variant='body2'>HOME</Typography>
            </Grid>
            <Grid item>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item>
                <Typography 
                    variant='body2' 
                    onClick={() => setPage.search()}
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    {searchPath}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item>
                <Typography variant='body2'>RESULT</Typography>
            </Grid>
        </Grid>
    );
}