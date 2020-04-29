import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography, Button, Box, Divider } from '@material-ui/core';

import { Bookmark } from '../Bookmark';
import formatDate from '../../helpers/formatDate';

export const ResultOverview = ({ result, alertError }) => {
    const classes = useStyles();

    return (
        <Paper square className={classes.result}>
            <Grid container direction='column'>
                <Grid item container justify='space-between'>
                    <Grid item>
                        <Typography variant='h4'>{result.title}</Typography>
                    </Grid>
                    <Grid item container xs justify='flex-end'>
                        <Bookmark
                            isBookmarked={result.isBookmarked}
                            documentId={result.documentID}
                            alertError={alertError}
                        />
                        <Button
                            disabled={!result.allowAccess}
                            className={classes.runButton}
                            variant='contained'
                            color='primary'
                        >
                            Run Report
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography className={classes.description} variant='body1'>
                        {result.description}
                    </Typography>
                </Grid>
                <Divider />
                <Grid item container className={classes.tagContainer}>
                    <Grid item xs container spacing={3} alignItems='center' justify='flex-start'>
                        <Grid item>
                            <Typography variant='body2'>
                                <b>Tags:</b> {result.subjectArea}, {result.toolType}
                            </Typography>
                        </Grid>
                        <Grid item>{!result.allowAccess && <NoAccess />}</Grid>
                    </Grid>

                    <Grid item container xs={2} justify='flex-end' alignItems='center'>
                        <Typography variant='body2'>
                            {'Updated ' + formatDate(result.updated)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

const NoAccess = () => {
    const classes = useStyles();
    return (
        <Typography variant='body2'>
            <Box className={classes.red} component='span'>
                Your user account may not have sufficient access to run this report.
            </Box>
            <Box component='span'> </Box>
            <Box className={classes.blue} component='span'>
                Request Access
            </Box>
        </Typography>
    );
};

const useStyles = makeStyles({
    result: {
        marginBottom: '20px',
        padding: '30px',
        paddingBottom: '25px',
    },
    description: {
        width: '60%',
        marginTop: '15px',
        marginBottom: '20px',
    },
    red: {
        color: 'red',
    },
    blue: {
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    runButton: {
        marginLeft: '20px',
    },
    tagContainer: {
        marginTop: '15px',
    },
});
