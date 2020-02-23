import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import { SearchBar } from '../SearchBar';
import { SearchFilter } from './SearchFilter';
import { SearchResults } from './SearchResults';
import { FilterChips } from '../Chips';

export default (props) => {
    const classes = useStyles();
    return (
        <Grid
            container
            className='search-page'
        >
            <Grid item>
                <SearchFilter {...props}/>
            </Grid>

            <Grid 
                xs 
                item 
                container 
                direction='column'
                className={classes.searchArea}
            >

                <SearchBar {...props}/>


                <Grid item className={classes.filterChips}>
                    <FilterChips  {...props}/>
                    <SearchResults  {...props}/>
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