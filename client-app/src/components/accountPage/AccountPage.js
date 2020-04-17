import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Paper, Button } from '@material-ui/core';

import { SESSION } from '../../stringConstants';

export default ({ signOut }) => {
    const classes = useStyles();
    let username = sessionStorage.getItem(SESSION.USERNAME);

    return (
        <Grid>
            <Paper square className={classes.content}>
                <Typography variant='h6' className={classes.items}>
                    {username ? 'Signed in as ' + username : 'My Account'}
                </Typography>
                <Grid className={classes.items}>
                    <Typography variant='body2'>Would you like to sign out?</Typography>
                    <Button
                        onClick={signOut}
                        className={classes.button}
                        variant='contained'
                        color='primary'
                    >
                        Sign Out
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    );
};

const useStyles = makeStyles({
    content: {
        padding: '20px',
    },
    logo: {
        height: '40px',
        width: 'auto',
    },
    items: {
        marginBottom: '20px',
    },
    button: {
        marginTop: '10px',
    },
});
