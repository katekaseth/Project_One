import React, { useState, useEffect } from 'react';
import { Grid, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { ResultOverview } from './ResultOverview';
import { ResultMetadata } from './ResultMetadata';
import { getResultEndpoint } from '../../api/documents';

import homeIcon from '../../icons/svg/home.svg';

export default ({ filterState, setPage, selectedResult, alertError }) => {
    const [result, setResult] = useState(null);

    if (!selectedResult) {
        selectedResult = localStorage.getItem('documentId');
    }

    const fetchResult = async (selectedResult) => {
        getResultEndpoint(selectedResult)
            .then((response) => {
                setResult(response.data);
            })
            .catch((err) => {
                alertError(err.status, "Couldn't fetch result");
            });
    };

    useEffect(() => {
        fetchResult(selectedResult);
    }, []);

    if (selectedResult === null || result === null) return <div></div>;
    return (
        <Grid>
            <Grid>
                <NavPath
                    searchPath={getSearchPath(filterState)}
                    setPage={setPage}
                    resultTitle={result.title}
                />
            </Grid>
            <Grid className='result-overview-container'>
                <ResultOverview result={result} alertError={alertError} />
            </Grid>
            <Grid className='result-metadata-container'>
                <ResultMetadata result={result} />
            </Grid>
        </Grid>
    );
};

const getSearchPath = (filterState) => {
    if (filterState === null) {
        return 'Search';
    }

    let filters = [];
    Object.keys(filterState).forEach((subjectKey) => {
        Object.keys(filterState[subjectKey]).forEach((filterKey) => {
            filterState[subjectKey][filterKey] && filters.push(filterKey);
        });
    });
    if (filters.length === 0) {
        return 'Search Page';
    } else {
        return filters.join(', ') + '...';
    }
};

const NavPath = ({ searchPath, setPage, resultTitle }) => {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item className={classes.item}>
                <CardMedia className={classes.icon} src={homeIcon} component='img' />
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography
                    variant='body2'
                    onClick={() => setPage.search()}
                    className={classes.link}
                >
                    {searchPath}
                </Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{'>'}</Typography>
            </Grid>
            <Grid item className={classes.item}>
                <Typography variant='body2'>{resultTitle}</Typography>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    link: {
        cursor: 'pointer',
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '5px',
    },
    icon: {
        width: '20px',
        height: '20px',
    },
});
