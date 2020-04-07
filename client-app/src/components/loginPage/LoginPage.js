import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Divider, TextField, Button, CardMedia, Box } from '@material-ui/core';

import wLogo from '../../images/W-Logo.png';
import wordmarkLogo from '../../images/Wordmark-Stacked.png';
import { loginApi } from '../../api/login';

export default ({ setPage, setError }) => {
    const classes = useStyles();

    return (
        <Grid container direction='column' alignItems='center' className={classes.content}>
            <Grid item container justify='center'>
                <Grid xs item container alignItems='flex-end' direction='column'>
                    <LoginComponent setPage={setPage} setError={setError} />
                </Grid>
                <Divider orientation='vertical' flexItem />
                <Grid xs item container direction='column' className={classes.learnLinks}>
                    <Typography className={classes.link} variant='body2'>
                        Learn about account recovery options
                    </Typography>
                    <Typography className={classes.link} variant='body2'>
                        Learn about UW NetIDs
                    </Typography>
                    <Typography className={classes.link} variant='body2'>
                        Learn about UW NetID sign-in
                    </Typography>
                    <Typography className={classes.link} variant='body2'>
                        Obtain a UW NetID
                    </Typography>
                    <br />
                    <Typography className={classes.link} variant='body2'>
                        Need help?
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                container
                direction='column'
                alignItems='center'
                className={classes.bottomContent}
            >
                <Typography variant='body2'>
                    Sign in reduces how often you have to reauthenticate to access UW resources.
                </Typography>
                <br />
                <Typography variant='body2'>
                    Learn how to{' '}
                    <Box className={classes.link} component='span'>
                        sign out
                    </Box>{' '}
                    at the end of your browsing session.
                </Typography>
                <br />
                <Typography variant='body2'>
                    <Box className={classes.link} component='span'>
                        PRIVACY
                    </Box>
                    <Box component='span'> | </Box>
                    <Box className={classes.link} component='span'>
                        TERMS
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    );
};

const LoginComponent = ({ setPage, setError }) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            loginApi(username, password, setPage);
        }
    };

    return (
        <Grid item container direction='column' xs={4}>
            <Grid item container className={classes.items}>
                <CardMedia className={classes.logo} src={wLogo} component='img' />
                <CardMedia className={classes.logo} src={wordmarkLogo} component='img' />
            </Grid>

            <Grid item className={classes.items}>
                <Typography variant='body2'>Please sign in.</Typography>
            </Grid>

            <Grid item className={classes.items}>
                <TextField
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setUsername(e.target.value)}
                    size='small'
                    label='UW NetID'
                    variant='outlined'
                />
            </Grid>

            <Grid item className={classes.items}>
                <TextField
                    onKeyPress={handleKeyPress}
                    onChange={(e) => setPassword(e.target.value)}
                    size='small'
                    label='Password'
                    type='password'
                    variant='outlined'
                />
            </Grid>

            <Grid className={classes.items}>
                <Typography className={classes.link} variant='body2'>
                    Forgot your password?
                </Typography>
            </Grid>

            <Grid item className={classes.items}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => loginApi(username, password, setPage, setError)}
                >
                    Sign in
                </Button>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles({
    content: {
        marginTop: '40px',
    },
    logo: {
        height: '40px',
        width: 'auto',
    },
    items: {
        marginBottom: '20px',
    },
    learnLinks: {
        marginLeft: '20px',
        marginTop: '50px',
    },
    bottomContent: {
        marginTop: '30px',
    },
    link: {
        textDecoration: 'underline',
        color: 'blue',
        cursor: 'pointer',
    },
});
