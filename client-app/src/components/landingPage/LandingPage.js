import React from 'react';
import { Grid } from '@material-ui/core';

import { SubjectAreaCards } from './SubjectAreaCards';
import { SearchBar } from '../SearchBar';
import { CapstoneLandingInfo } from './CapstoneLandingInfo';

export default function LandingPage() {
    return (
        <Grid 
            container 
            justify='center'
            alignItems='center'
            id='landing-page'
            spacing={10}
            direction='column'
        >
            <Grid item className='title-header'>
                <h1>Business Intelligence Portal</h1>
            </Grid>
            <Grid 
                item
                className='search-bar-container'>
                <SearchBar/>
            </Grid>
            <Grid 
                item
                container 
                justify='center'
                className='subject-card-container'>
                <SubjectAreaCards/>
            </Grid>
            <Grid xs={8} item className='capstone-info'>
                <CapstoneLandingInfo/>
            </Grid>
        </Grid>
    )
}