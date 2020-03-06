import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

import bookmarkedIcon from '../icons/svg/bookmarked.svg';
import unbookmarkedIcon from '../icons/svg/unbookmarked.svg';

import { bookmarkEndpoint, unbookmarkEndpoint } from '../api/bookmarks';

export const Bookmark = ({ style, documentId, isBookmarked }) => {
    const [bookmarkState, setBookmarkState] = useState(isBookmarked);
    const classes = useStyles();

    const handleClick = async e => {
        e.stopPropagation();
        let response;
        if (bookmarkState) {
            response = await unbookmarkEndpoint(documentId);
        } else {
            response = await bookmarkEndpoint(documentId);
        }
        if (response.status === 200) {
            setBookmarkState(!bookmarkState);
        }
    };

    return (
        <CardMedia
            style={style}
            className={classes.bookmark}
            src={bookmarkState ? bookmarkedIcon : unbookmarkedIcon}
            component='img'
            onClick={handleClick}
        />
    );
};

const useStyles = makeStyles({
    bookmark: {
        width: '35px',
        height: 'auto',
        zIndex: '2',
        cursor: 'pointer',
    },
});
