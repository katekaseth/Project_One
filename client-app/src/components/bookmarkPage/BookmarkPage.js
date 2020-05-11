import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, CardMedia } from '@material-ui/core';

import bookmarkedIcon from '../../icons/svg/bookmarked.svg';
import unbookmarkedIcon from '../../icons/svg/unbookmarked.svg';

import { SearchResults } from '../searchPage/SearchResults';
import { SearchBar } from '../SearchBar';

export default ({
    setPage,
    bookmarks,
    alertError,
    updateSearchBookmarkTerms,
    searchedBookmarkTerms,
}) => {
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
                {bookmarks && bookmarks.length !== 0 && (
                    <SearchBar
                        redirect={() => {}}
                        updateSearchTerms={updateSearchBookmarkTerms}
                        searchedTerms={[searchedBookmarkTerms]}
                        isBookmark={true}
                    />
                )}
            </Grid>
            <Grid item container>
                {bookmarks && bookmarks.length === 0 && <NoBookmarksHelper />}
                {bookmarks && bookmarks.length !== 0 && (
                    <SearchResults setPage={setPage} results={bookmarks} alertError={alertError} />
                )}
            </Grid>
        </Grid>
    );
};

const NoBookmarksHelper = () => {
    const classes = useStyles();
    return (
        <Grid>
            <Typography variant='h6'>Looks like you don't have any bookmarks!</Typography>
            <Typography>
                To add new bookmarks, look for this symbol{' '}
                <CardMedia
                    src={unbookmarkedIcon}
                    component='img'
                    className={classes.littleBookmark}
                />{' '}
                on a report overview. Click it to save the bookmark.
            </Typography>
            <br />
            <Typography variant='body2'>
                <CardMedia
                    src={bookmarkedIcon}
                    component='img'
                    className={classes.littlestBookmark}
                />{' '}
                If the icon is purple, it means the report has been bookmarked. Click to unbookmark
                it.
            </Typography>
            <Typography variant='body2'>
                <CardMedia
                    src={unbookmarkedIcon}
                    component='img'
                    className={classes.littlestBookmark}
                />{' '}
                If it's grey, it means it hasn't been bookmarked. Click to bookmark it.
            </Typography>
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
    littleBookmark: {
        width: '20px',
        display: 'inline',
        marginBottom: '-4px',
        marginRight: '3px',
        marginLeft: '3px',
    },
    littlestBookmark: {
        width: '10px',
        display: 'inline',
        marginRight: '3px',
        marginLeft: '3px',
        marginTop: '5px',
    },
});
