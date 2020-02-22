import React from 'react';
import { Grid, Paper, Typography, Button } from '@material-ui/core';
import { TagChip } from '../Chips';

export const ResultOverview = () => {
    return (
        <Paper square>
            <Grid 
                container
                direction='column'
            >
                <Grid item container justify='space-between'>
                    <Grid item>
                        <Typography variant='h4'>Report Title</Typography>
                    </Grid>
                    <Grid item container xs justify='flex-end'>
                        <Typography variant='h6'>Bookmark icon</Typography>
                        <Button variant="contained" color="primary">Run Report</Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>
                        Description
                    </Typography>
                </Grid>
                <Grid item container justify='space-between' >
                    <Grid item xs container alignItems='center'>
                        <Grid>
                            <TagChip label='placeholder'/>
                        </Grid>
                        <Grid>
                            <Typography variant='body2'>Access stuff</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs justify='flex-end'>
                        <Typography variant='body2'>Updated Jan 1, 2020</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}