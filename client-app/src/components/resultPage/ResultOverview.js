import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Paper, Typography, Button, Box } from '@material-ui/core';

import { TagChip } from '../Chips';
import { Bookmark } from '../Bookmark';

export const ResultOverview = () => {
    const classes = useStyles();

    return (
        <Paper square className={classes.result}>
            <Grid 
                container
                direction='column'
            >
                <Grid item container justify='space-between'>
                    <Grid item>
                        <Typography variant='h4'>Report Title</Typography>
                    </Grid>
                    <Grid item container xs justify='flex-end'>
                        <Bookmark bookmarked={true}/>
                        <Button className={classes.runButton} variant="contained" color="primary">Run Report</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography className={classes.description} variant='body1'>
                        This report displays a list of grant and contract budgets in advance funding status for a selected Org Code structure. No historical information is reported.
                    </Typography>
                </Grid>
                <Grid item container>
                    <Grid item xs container alignItems='center'>
                        <Grid>
                            <TagChip label='Academic'/>
                            <TagChip label='Report'/>
                        </Grid>
                        <Grid>
                            <NoAccess/>
                        </Grid>
                    </Grid>
                    <Grid item container xs={2} justify='flex-end' alignItems='flex-end'>
                        <Typography variant='body2'>Updated Jan 1, 2020</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

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
}

const useStyles = makeStyles({
    result: {
        marginBottom: '20px',
        padding: '20px',
    },
    description: {
        width: '60%',
        marginTop: '8px',
        marginBottom: '12px'
    },
    red: {
        color: 'red'
    },
    blue: {
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline'
        },
    },
    runButton: {
        marginLeft: '20px'
    }
});