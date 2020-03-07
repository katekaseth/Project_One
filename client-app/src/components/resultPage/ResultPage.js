import React, { useState, useEffect} from 'react';
import { Grid, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'

import { ResultOverview } from './ResultOverview';
import { ResultMetadata } from './ResultMetadata';
import { getResultEndpoint } from '../../api/documents';

import homeIcon from '../../icons/svg/home.svg';

export default ({filterState, setPage, selectedResult}) => {
    const [result, setResult] = useState(null);

    const fetchResult = async selectedResult => {
        const response = await getResultEndpoint(selectedResult);
        setResult(response.data);
    };

    useEffect(() => {
        fetchResult(selectedResult);
    }, []);

    if (selectedResult === null || result === null) return <div></div>;
    return (
        <Grid>
            <Grid>
                <NavPath searchPath={getSearchPath(filterState)} setPage={setPage} />
            </Grid>
            <Grid className='result-overview-container'>
                <ResultOverview result={result} />
            </Grid>
            <Grid className='result-metadata-container'>
                <ResultMetadata result={result} />
            </Grid>
        </Grid>
    );
};

const getSearchPath = filterState => {
    if (filterState === null) {
        return 'Search';
    }

    let filters = [];
    Object.keys(filterState).forEach(subjectKey => {
        Object.keys(filterState[subjectKey]).forEach(filterKey => {
            filterState[subjectKey][filterKey] && filters.push(filterKey);
        });
    });
    if (filters.length === 0) {
        return 'Search';
    } else {
        return filters.join(',') + '...';
    }
};

const NavPath =  ({searchPath, setPage}) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item className={classes.item}>
                <CardMedia className={classes.icon} src={homeIcon} component='img'/>
            </Grid>
            <Grid item className={classes.item}> 
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography 
                    variant='body2' 
                    onClick={() => setPage.search()}
                    style={{ cursor: 'pointer', color: 'blue' }}
                >
                    {searchPath}
                </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>RESULT</Typography>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles({
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
    },
    icon: {
        width: '20px',
        height: '20px',
    }
});
