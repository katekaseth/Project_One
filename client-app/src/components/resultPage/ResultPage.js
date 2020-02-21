import React, { useState } from 'react';
import { Grid } from '@material-ui/core';

export default () => {
    return (
        <Grid>
            <Grid>
                <NavPath/>
            </Grid>
            <Grid>
                
            </Grid>
            <Grid>

            </Grid>
        </Grid>
    );
};

const NavPath =  () => {
    return (
        "home > search page > result"
    );
}