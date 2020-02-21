import React from 'react';
import { Grid } from '@material-ui/core';

import { SubjectAreaCards } from './SubjectAreaCards';
import { SearchBar } from '../SearchBar';

export default (props) => {
    return (
        <Grid
            className='landing-page'
            container 
            justify='center'
            alignItems='center'
            direction='column'
            spacing={10}
        >
            <Grid item className='title-header'>
                <h1>UW Analytics</h1>
            </Grid>
            <Grid 
                item
                className='search-bar-container'>
                <SearchBar {...props}/>
            </Grid>
            <Grid 
                item
                container 
                justify='center'
                className='subject-card-container'>
                <SubjectAreaCards/>
            </Grid>
            <Grid 
                item
                container 
                justify='center'
                className='subject-card-container'>
                <SubjectAreaCards/>
            </Grid>
            <Grid 
                item
                container 
                justify='center'
                className='subject-card-container'>
                <SubjectAreaCards/>
            </Grid>
        </Grid>
    )
}