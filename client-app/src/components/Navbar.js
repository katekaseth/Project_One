import React from 'react';
import '../App.css';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import era_logo from '../icons/era_logo.png';
import { SESSION } from '../stringConstants';

export default ({ setPage, transparent }) => {
    let className = transparent ? 'transparent' : '';
    let username = sessionStorage.getItem(SESSION.USERNAME);

    const classes = useStyles();

    return (
        <div className={`navigation-bar ${className}`}>
            <img
                alt='UW ERA logo'
                onClick={() => setPage.home()}
                id='nav-logo'
                src={era_logo}
            ></img>
            <ul>
                <li onClick={() => setPage.account()}>
                    {
                        <Grid container>
                            <AccountCircleIcon className={classes.accountIcon} />
                            {username}
                        </Grid>
                    }
                </li>
                
                <li onClick={() => setPage.search()}>Search</li>
                <li onClick={() => setPage.bookmarks()}>Bookmarks</li>
                <li onClick={() => setPage.home()}>Home</li>
            </ul>
        </div>
    );
};

const useStyles = makeStyles({
    accountIcon: {
        marginRight: '5px',
    },
});
