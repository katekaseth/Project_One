import React from 'react';
import { Typography, Grid } from '@material-ui/core';

import SearchPage from '../searchPage/SearchPage';

export default (props) => {    
    return (
        <Grid 
            container 
            className='search-page-container'
            direction='column'
        >
            <Typography paragraph={true} color='primary' variant='h4'>Bookmarks</Typography>
            <SearchPage {...props}/>
        </Grid>
    );
};