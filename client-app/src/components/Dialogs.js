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

const ERROR = 'Something went wrong';

export const ErrorDialog = ({ message, setError }) => {
    const classes = useStyles();
    return (
        message && (
            <CustomDialog
                title={ERROR}
                message={message}
                handleClose={() => setError(null)}
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
