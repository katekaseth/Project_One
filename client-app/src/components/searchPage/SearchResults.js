import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { FaGraduationCap } from "react-icons/fa";

import { TagChip } from '../Chips';
import { Bookmark } from '../Bookmark';

const NUM_PER_PAGE = 5;

export const SearchResults = ({setPage, results}) => {
    const [pagination, setPagination] = useState(0);

    if (results === null) return (<div></div>);
    let pageNum = parseInt(results.length / NUM_PER_PAGE) + (results.length % NUM_PER_PAGE === 0 && results.length > NUM_PER_PAGE? 0 : 1);

    return (
        <Grid 
            container 
            direction='column' 
            className='search-result-container'
        >
            {
                results.slice(pagination * NUM_PER_PAGE, (pagination + 1) * NUM_PER_PAGE).map(result => {
                    return <SearchResult setPage={setPage} result={result}/>
                })
            }
            <Pagination onChange={(e, value) => setPagination(value)} count={pageNum}/>
        </Grid>
    );
};

const SearchResult = ({setPage, result}) => {
    const classes = useStyles();

    return (
        <Paper 
            onClick={() => setPage.result(result.documentID)}
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
                            onClick={() => setPage.result(result.documentID)} 
                            className={classes.resultTitle}
                            variant='h6'
                        >
                            {result.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Bookmark style={{marginTop: '-10px'}} bookmarked={false}/>
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