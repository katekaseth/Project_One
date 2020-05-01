import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, Tooltip } from '@material-ui/core';

import bookmarkedIcon from '../icons/svg/bookmarked.svg';
import unbookmarkedIcon from '../icons/svg/unbookmarked.svg';

import { bookmarkEndpoint, unbookmarkEndpoint } from '../api/bookmarks';

export const Bookmark = ({ style, documentId, isBookmarked, alertError }) => {
    const [bookmarkState, setBookmarkState] = useState(isBookmarked);
    const classes = useStyles();

    const handleClick = async (e) => {
        e.stopPropagation();
        if (bookmarkState) {
            unbookmarkEndpoint(documentId)
                .then((response) => {
                    setBookmarkState(!bookmarkState);
                })
                .catch((err) => {
                    alertError("Internal server error: can't bookmark document", true);
                });
        } else {
            bookmarkEndpoint(documentId)
                .then((response) => {
                    setBookmarkState(!bookmarkState);
                })
                .catch((err) => {
                    alertError("Internal server error: can't bookmark document", true);
                });
        }
    };

    return (
        <Tooltip title={'Click to ' + (bookmarkState ? 'unbookmark' : 'bookmark')}>
            <CardMedia
                style={style}
                className={classes.bookmark}
                src={bookmarkState ? bookmarkedIcon : unbookmarkedIcon}
                component='img'
                onClick={handleClick}
            />
        </Tooltip>
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
