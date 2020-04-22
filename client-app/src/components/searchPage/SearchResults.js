import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/styles';

import { SearchResult } from './SearchResult';

const NUM_PER_PAGE = 5;

export const SearchResults = ({ setPage, results, alertError }) => {
    const [pagination, setPagination] = useState(1);
    const classes = useStyles();

    if (results === null) return <div></div>;
    let numOfPages = Math.ceil(results.length / NUM_PER_PAGE);

    let resultCards = results.map((result, index) => {
        return (
            <SearchResult key={index} setPage={setPage} result={result} alertError={alertError} />
        );
    });

    return (
        <Grid container direction='column' className='search-result-container' alignItems='center'>
            {resultCards.slice(
                (pagination - 1) * NUM_PER_PAGE,
                (pagination - 1) * NUM_PER_PAGE + NUM_PER_PAGE,
            )}
            {numOfPages > 1 && (
                <Pagination
                    className={classes.pagination}
                    onChange={(e, value) => setPagination(value)}
                    count={numOfPages}
                />
            )}
        </Grid>
    );
};

const useStyles = makeStyles({
    pagination: {
        margin: '20px',
    },
});
