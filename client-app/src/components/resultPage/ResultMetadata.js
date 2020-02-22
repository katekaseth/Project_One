import React, { useState } from 'react';
import { 
    Grid, 
    Paper, 
    Typography, 
    MenuList, 
    MenuItem 
} from '@material-ui/core';

import { METADATA_TABS } from '../../stringConstants';

export const ResultMetadata = () => {
    const [metadataTab, setMetadataTab] = useState('technicalInfo');

    return (
        <Grid container >
            <Grid item>
                <MetadataMenu setMetadataTab={setMetadataTab}/>
            </Grid>
            <Grid xs item>
                <Metadata metadataTab={metadataTab}/>
            </Grid>
        </Grid>
    );
}

const Metadata = ({metadataTab}) => {
    return (
        <Paper square>
            <Typography variant='h5'>{METADATA_TABS[metadataTab]}</Typography>
        </Paper>
    );
}

const MetadataMenu = ({setMetadataTab}) => {
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