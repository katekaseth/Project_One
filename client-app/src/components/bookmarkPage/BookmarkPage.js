import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

import { SearchResults } from '../searchPage/SearchResults';

export default (props) => {
    const classes = useStyles();
    return (
        <Grid container direction='column'>
            <Grid xs item className={classes.bookmarkTitle}>
                <Typography paragraph={true} color='primary' variant='h4'>
                    Bookmarks
                </Typography>
            </Grid>
            <Grid item container>
                <SearchResults {...props} />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    bookmarkTitle: {},
});
