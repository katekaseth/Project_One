import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core';

import { SESSION } from '../stringConstants';

const ERROR = 'Something went wrong';

export const ErrorDialog = ({ setPage, message, setError }) => {
    const classes = useStyles();
    const handleClose =
        message !== SESSION.SESSION_EXPIRED_MESSAGE
            ? () => setError(null)
            : () => {
                  setPage.login();
                  setError(null);
              };

    return (
        message && (
            <CustomDialog
                title={ERROR}
                message={message}
                handleClose={handleClose}
                className={classes.error}
            />
        )
    );
};

const CustomDialog = ({ title, message, handleClose, className }) => {
    const classes = useStyles();

    return (
        <Dialog onClose={handleClose} open={true}>
            <DialogTitle className={className}>{title}</DialogTitle>
            <DialogContent className={classes.dialog}>
                <DialogContentText>{message}</DialogContentText>
                <DialogActions>
                    <Button onClick={handleClose}>Okay</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

const useStyles = makeStyles({
    dialog: {
        width: '500px',
        alignSelf: 'center',
    },
    error: {
        color: 'red',
    },
});
