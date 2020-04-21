import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, CardMedia } from '@material-ui/core';

import bookmarkedIcon from '../../icons/svg/bookmarked.svg';

import { SearchResults } from '../searchPage/SearchResults';
import { SearchBar } from '../SearchBar';

export default ({ setPage, bookmarks, alertError, updateSearchBookmarkTerms }) => {
    const classes = useStyles();
    return (
        <Grid container direction='column'>
            <Grid xs container item className={classes.bottomSpacing}>
                <Grid item>
                    <CardMedia src={bookmarkedIcon} component='img' className={classes.bookmark} />
                </Grid>
                <Grid item>
                    <Typography className={classes.bookmarkTitle} variant='h4'>
                        Your Bookmarks -
                    </Typography>
                    <Typography className={classes.bookmarkNum} variant='h4'>
                        {bookmarks ? bookmarks.length : 'None'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item className={classes.bottomSpacing}>
                <SearchBar
                    setPage={setPage}
                    updateSearchTerms={updateSearchBookmarkTerms}
                    searchedTerms={[]}
                    isBookmark={true}
                ></SearchBar>
            </Grid>
            <Grid item container>
                <SearchResults setPage={setPage} results={bookmarks} alertError={alertError} />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    bookmarkTitle: {
        color: '#5E5B5B',
        fontFamily: 'Encode-sans, sans-serif',
        fontWeight: 'bold',
        display: 'inline-block',
        paddingRight: '1rem',
    },
    bookmarkNum: {
        color: '#5E5B5B',
        fontFamily: 'Encode-sans, sans-serif',
        display: 'inline-block',
    },
    bookmark: {
        width: '35px',
        height: 'auto',
        paddingRight: '1rem',
    },
    bottomSpacing: {
        marginBottom: '1rem',
    },
});
