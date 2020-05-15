import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { SubjectAreaCards } from './SubjectAreaCards';
import { SearchBar } from '../SearchBar';

export default (props) => {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.content}
            justify='center'
            alignItems='center'
            direction='column'
        >
            <Grid item className={classes.titleContainer}>
                <Typography className={classes.title} variant='h3'>
                    UW Analytics
                </Typography>
            </Grid>
            <Grid item className={classes.searchBarContainer}>
                <SearchBar redirect={() => props.setPage.search()} {...props} />
            </Grid>
            <Grid item container justify='center'>
                <SubjectAreaCards {...props} />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    content: {
        paddingTop: '130px',
    },
    titleContainer: {
        marginBottom: '40px',
    },
    searchBarContainer: {
        width: '47rem',
        marginBottom: '40px',
    },
    title: {
        color: 'white',
        textShadow: '1px 1px 2px #000000',
    },
});
