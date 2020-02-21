import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { FaGraduationCap } from "react-icons/fa";

import { TagChip } from '../Chips';

export const SearchResults = () => {
    let fakeResults = getFakeResults();
    return (
        <Grid 
            container 
            direction='column' 
            className='search-result-container'
        >
            {
                fakeResults.map(result => {
                    return <SearchResult result={result}/>
                })
            }
        </Grid>
    );
};

const SearchResult = ({result}) => {
    return (
        <Paper square className='search-result'>
            <Grid 
                container 
                direction='column'
            >
                <Grid item container justify='space-between'>
                    <Grid xs item container alignItems='center'>
                        <FaGraduationCap/>
                        <Typography variant='h6'>{result.title}</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>Bookmark icon</Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body2'>{result.description}</Typography>
                </Grid>
                <Grid item container alignItems='center' justify='space-between'>
                    <Grid item>
                        {
                            result.tags.map(tagLabel => {
                                return <TagChip label={tagLabel}/>
                            })
                        }
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{`Updated ${result.lastUpdated}`}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

const getFakeResults = () => {
    let results = [];
    results.push({
        title: 'Test',
        description: 'This is a description',
        tags: ['Academic', 'Report'],
        lastUpdated: 'Jan 1, 2020',
    });
    results.push({
        title: 'Test',
        description: 'This is a description',
        tags: ['Academic', 'Report'],
        lastUpdated: 'Jan 1, 2020',
    });
    results.push({
        title: 'Test',
        description: 'This is a description',
        tags: ['Academic', 'Report'],
        lastUpdated: 'Jan 1, 2020',
    });
    results.push({
        title: 'Test',
        description: 'This is a description',
        tags: ['Academic', 'Report'],
        lastUpdated: 'Jan 1, 2020',
    });
    return results;
};