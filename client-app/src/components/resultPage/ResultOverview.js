import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography, Button, Box } from '@material-ui/core';

import { TagChip } from '../Chips';
import { Bookmark } from '../Bookmark';
import formatDate from '../../helpers/formatDate';

export const ResultOverview = ({ result, setError }) => {
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
                            setError={setError}
                        />
                        <Button className={classes.runButton} variant='contained' color='primary'>
                            Run Report
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography className={classes.description} variant='body1'>
                        {result.description}
                    </Typography>
                </Grid>
                <Grid item container>
                    <Grid item xs container alignItems='center'>
                        <Grid>
                            <TagChip label={result.subjectArea} />
                            <TagChip label={result.toolType} />
                        </Grid>
                        <Grid>
                            <NoAccess />
                        </Grid>
                    </Grid>
                    <Grid item container xs={2} justify='flex-end' alignItems='flex-end'>
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
        padding: '20px',
    },
    description: {
        width: '60%',
        marginTop: '8px',
        marginBottom: '12px',
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
});
