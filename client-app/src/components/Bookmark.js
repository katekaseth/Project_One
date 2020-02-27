import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

import bookmarkedIcon from '../icons/svg/bookmarked.svg';
import unbookmarkedIcon from '../icons/svg/unbookmarked.svg';


export const Bookmark = ({style}) => {
    const classes = useStyles();
    const [bookmarked, setBookmarked] = useState(false);
   
    return (
        <CardMedia 
            style={style}
            className={classes.bookmark} 
            src={bookmarked ? bookmarkedIcon : unbookmarkedIcon} 
            component='img'
            onClick={(e) => {
                e.stopPropagation();
                setBookmarked(!bookmarked);
            }}
        />
    );
}

const useStyles = makeStyles({
    bookmark: {
        width: '35px',
        height: 'auto',
        zIndex: '2',
        cursor: 'pointer',
    }
});