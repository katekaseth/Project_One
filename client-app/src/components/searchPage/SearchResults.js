import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, CardMedia } from '@material-ui/core';
import { FaGraduationCap } from "react-icons/fa";

import { TagChip } from '../Chips';
import { Bookmark } from '../Bookmark';

export const SearchResults = ({setPage}) => {
    let fakeResults = getFakeResults();

    return (
        <Grid 
            container 
            direction='column' 
            className='search-result-container'
        >
            {
                fakeResults.map(result => {
                    return <SearchResult setPage={setPage} result={result}/>
                })
            }
        </Grid>
    );
};

const SearchResult = ({setPage, result}) => {
    const classes = useStyles();

    return (
        <Paper 
            onClick={() => setPage.result()}
            square 
            className={classes.searchResult}
        >
            <Grid 
                container 
                direction='column'
            >
                <Grid item container justify='space-between'>
                    <Grid xs item container alignItems='center'>
                        <FaGraduationCap/>
                        <Typography 
                            onClick={() => setPage.result()} 
                            className={classes.resultTitle}
                            variant='h6'
                        >
                            {result.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Bookmark bookmarked={false}/>
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

const useStyles = makeStyles({
    searchResult: {
        marginTop: '20px',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingRight: '15px',
        paddingLeft: '15px',
    },
    resultTitle: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

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