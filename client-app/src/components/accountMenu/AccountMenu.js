import React from 'react';
import { Grid, Popover, Button, Typography, Divider } from '@material-ui/core/';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/styles';

import { SESSION } from '../../stringConstants';

export const AccountMenu = ({ className, signOut }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    let username = sessionStorage.getItem(SESSION.USERNAME);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <div>
            <Grid container onClick={handlePopoverOpen} className={className}>
                <AccountCircleIcon className={classes.accountIcon} />
                {username}
            </Grid>
            <Popover
                PaperProps={{ square: true }}
                className={classes.popup}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={handlePopoverClose}
            >
                <Grid container direction='column' className={classes.popupContent}>
                    <Typography
                        className={classes.signedInText}
                        variant='body2'
                    >{`${username}, you are currently sign in.`}</Typography>
                    <Button
                        onClick={signOut}
                        className={classes.space}
                        variant='contained'
                        color='primary'
                    >
                        Sign Out
                    </Button>
                    <Divider className={classes.space} light />
                    <Typography variant='body2'>
                        <Grid component='span' className={classes.gray}>
                            Access Level:{' '}
                        </Grid>
                        <Grid component='span'>Fiscal Tech</Grid>
                    </Typography>
                    <Typography variant='body2'>
                        <Grid component='span' className={classes.gray}>
                            Job Title:{' '}
                        </Grid>
                        <Grid component='span'>Financial Analyst</Grid>
                    </Typography>
                    <Typography variant='body2'>
                        <Grid component='span' className={classes.gray}>
                            Department:{' '}
                        </Grid>
                        <Grid component='span'>Math</Grid>
                    </Typography>
                </Grid>
            </Popover>
        </div>
    );
};

const useStyles = makeStyles({
    accountIcon: {
        marginRight: '5px',
    },
    popup: {
        marginTop: '20px',
    },
    popupContent: {
        padding: '13px',
    },
    signedInText: {
        color: 'gray',
        marginBottom: '10px',
    },
    space: {
        marginBottom: '15px',
    },
    gray: {
        color: 'gray',
    },
});
