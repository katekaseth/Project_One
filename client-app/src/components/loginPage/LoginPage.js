import React from 'react';
import { 
    Grid, 
    Typography, 
    Divider, 
    TextField,
    Button
} from '@material-ui/core';

export default () => {
    return (
        <Grid 
            container 
            direction='column'
            alignItems='center'
        >
            <Grid 
                item
                container 
                justify='center'
            >
                <Grid
                    xs
                    container 
                    alignItems='flex-end'
                    direction='column'
                >
                    <LoginComponent/>
                </Grid>
                <Divider orientation='vertical' flexItem/>
                <Grid xs>
                    <Typography variant='body2'>
                        Learn about account recovery options
                    </Typography>
                    <Typography variant='body2'>
                        Learn about UW NetIDs
                    </Typography>
                    <Typography variant='body2'>
                        Learn about UW NetID sign-in
                    </Typography>
                    <Typography variant='body2'>
                        Obtain a UW NetID
                    </Typography>
                    <br/>
                    <Typography variant='body2'>
                        Need help?
                    </Typography>
                </Grid>
            </Grid>
            <Grid 
                item
                container 
                direction='column'
                alignItems='center'
            >
                <Typography variant='body2'>
                    Sign in reduces how often you have to reauthenticate to access UW resources.
                </Typography>
                <Typography variant='body2'>
                    Learn how to sign out at the end of your browsing session.
                </Typography>
                <Typography variant='body2'>
                    PRIVACY | TERMS
                </Typography>
            </Grid>
        </Grid>
    );
}

const LoginComponent = () => {
    return (
        <Grid
            item
            container 
            direction='column'
            xs={4}
        >
            <Grid item>
                <Typography variant='body2'>
                    LOGO
                </Typography>
                <Typography variant='body2'>
                    Please sign in.
                </Typography>
            </Grid>

            <Grid item>
                <TextField size='small' label='UW NetID' variant='outlined' />
            </Grid>

            <Grid item>
                <TextField size='small' label='Password' type='password' variant='outlined' />
            </Grid>

            <Typography variant='body2'>
                Forgot your password?
            </Typography>

            <Grid item>
                <Button variant="contained" color="primary">Sign in</Button>
            </Grid>
        </Grid>
    );
}