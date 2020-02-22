import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

import bookmarkedIcon from '../icons/svg/bookmarked.svg';
import unbookmarkedIcon from '../icons/svg/unbookmarked.svg';


export const Bookmark = (bookmarked) => {
    const classes = useStyles();
    let src = bookmarked === true ? bookmarkedIcon : unbookmarkedIcon;
    return (
        <CardMedia className={classes.bookmark} src={src} component='img'/>
    );
}

const useStyles = makeStyles({
    bookmark: {
        width: '35px',
        height: 'auto',
        marginTop: '-10px',
    }
});