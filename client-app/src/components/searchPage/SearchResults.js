import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, CardMedia } from '@material-ui/core';
import { FaGraduationCap } from "react-icons/fa";

import { TagChip } from '../Chips';
import { Bookmark } from '../Bookmark';
import { searchEndpoint } from '../../api/search';

export const SearchResults = ({setPage, filterState}) => {
    const [results, setResults] = useState(null);

    const fetchResults = async () => {
        const response = await searchEndpoint(filterState);
        setResults(response.data);
    }

    fetchResults();

    if (results === null) return (<div></div>);
    return (
        <Grid 
            container 
            direction='column' 
            className='search-result-container'
        >
            {
                results.map(result => {
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
                        <TagChip label={result.subjectArea}/>
                        <TagChip label={result.toolType}/>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>{`Updated ${result.updated}`}</Typography>
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