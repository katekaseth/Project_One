import React from 'react';
import { makeStyles } from '@material-ui/styles';

import era_logo from '../icons/era_logo.png';
import { AccountMenu } from './accountMenu/AccountMenu';

export default ({ setPage, transparent, signOut }) => {
    const classes = useStyles();

    return (
        <div className={transparent ? classes.navBarTransparent : classes.navBar}>
            <img
                alt='UW ERA logo'
                onClick={() => setPage.home()}
                className={classes.navBarImg}
                src={era_logo}
            ></img>
            <ul className={classes.menuList}>
                <AccountMenu className={classes.menuItem} signOut={signOut} />
                <li className={classes.menuItem} onClick={() => setPage.search()}>
                    Search
                </li>
                <li className={classes.menuItem} onClick={() => setPage.bookmarks()}>
                    Bookmarks
                </li>
                <li className={classes.menuItem} onClick={() => setPage.home()}>
                    Home
                </li>
            </ul>
        </div>
    );
};

const useStyles = makeStyles({
    navBar: {
        zIndex: 9,
        position: 'sticky',
        height: '70px',
        width: '100%',
        textAlign: 'center',
        fontSize: 'larger',
        backgroundColor: 'rgba(75, 46, 131, 1)',
        left: '0px',
        top: '0px',
        margin: '0px',
        paddingTop: 'auto',
        paddingBottom: 'auto',
        display: 'flex',
    },
    navBarTransparent: {
        zIndex: 9,
        position: 'sticky',
        height: '70px',
        width: '100%',
        textAlign: 'center',
        fontSize: 'larger',
        left: '0px',
        top: '0px',
        margin: '0px',
        paddingTop: 'auto',
        paddingBottom: 'auto',
        display: 'flex',
        background: 'none',
    },
    navBarImg: {
        float: 'left',
        width: '280px',
        padding: '14px 16px',
        cursor: 'pointer',
    },
    menuList: {
        margin: '0px',
        flex: '1',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row-reverse',
        listStyleType: 'none',
    },
    menuItem: {
        '&:hover': {
            textDecoration: 'underline',
        },
        color: 'white',
        padding: '14px 16px',
        fontFamily: "'Encode Sans', sans-serif",
        textDecoration: 'none',
        cursor: 'pointer',
    },
});
