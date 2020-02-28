import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { SearchResult } from './SearchResult';

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