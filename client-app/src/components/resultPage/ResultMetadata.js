import React, { useState } from 'react';
import { 
    Grid, 
    Paper, 
    Typography, 
    MenuList, 
    MenuItem 
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { METADATA_TABS } from '../../stringConstants';

export const ResultMetadata = () => {
    const [metadataTab, setMetadataTab] = useState('technicalInfo');

    return (
        <Grid container>
            <Grid item>
                <MetadataMenu metadataTab={metadataTab} setMetadataTab={setMetadataTab}/>
            </Grid>
            <Grid xs item>
                <Metadata metadataTab={metadataTab}/>
            </Grid>
        </Grid>
    );
}

const Metadata = ({metadataTab}) => {
    const classes = useStyles();
    return (
        <Paper square className={classes.metadata}>
            <Typography variant='h5'>{METADATA_TABS[metadataTab]}</Typography>
        </Paper>
    );
}

const MetadataMenu = ({metadataTab, setMetadataTab}) => {
    const classes = useStyles();
    return (
        <Paper square>
            <MenuList>
                {
                    Object.keys(METADATA_TABS).map(tabKey => {
                        return (
                            <MenuItem onClick={() => setMetadataTab(tabKey)}>
                                {METADATA_TABS[tabKey]}
                            </MenuItem>
                        )
                    })
                }
            </MenuList>
        </Paper>
    );
}

const useStyles = makeStyles({
    metadata: {
        padding: '20px',
        height: '400px',
        zIndex: '1'
    },
    metadataTab: {
        backgroundColor: 'red'
    }
});