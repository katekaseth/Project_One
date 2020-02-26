import React, { useState } from 'react';
import { 
    Grid, 
    Paper, 
    Typography,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { COLORS } from '../../theme';
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
        <Grid className={classes.background}>
            {
                Object.keys(METADATA_TABS).map(tabKey => {
                    let isSelected = metadataTab === tabKey;
                    return (
                        <Paper 
                            square
                            className={classes.metadataTab}  
                            onClick={() => setMetadataTab(tabKey)}
                        >
                            <Grid container justify='flex-start'>
                                <Grid xs item container className={classes.leftWrapper}>
                                    <Grid item className={isSelected ? classes.selectedBlockLeft : classes.unselectedBlockLeft}></Grid>
                                </Grid>
                                <Grid xs={10} item container>
                                    <Typography>
                                        {METADATA_TABS[tabKey]}
                                    </Typography>
                                </Grid>
                                <Grid xs item container justify='flex-end' className={classes.rightWrapper}>
                                    <Grid item className={isSelected ? classes.selectedBlockRight : classes.unselectedBlockRight}></Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    );
                })
            }
        </Grid>

    );
}

const useStyles = makeStyles({
    metadata: {
        padding: '20px',
        height: '400px',
        zIndex: '1',
    },
    metadataTab: {
        marginBottom: '2px',
        paddingTop: '10px',
        paddingBottom: '10px',
        width: '130px',
    },
    background: {
        backgroundColor: 'white'
    },
    rightWrapper: {
        justify: 'flex-end',
    },
    selectedBlockRight: {
        width: '20px',
        marginTop: '-10px',
        marginBottom: '-10px',
        marginRight: '-10px',
        backgroundColor: 'white',
        zIndex: '2',
    },
    unselectedBlockRight: {
        width: '20px',
        marginTop: '-10px',
        marginBottom: '-10px',
        marginRight: '-10px',
        zIndex: '2',
    },
    leftWrapper: {
        justify: 'flex-start',
    },
    selectedBlockLeft: {
        width: '6px',
        marginTop: '-10px',
        marginBottom: '-10px',
        backgroundColor: COLORS.PURPLE,
        zIndex: '2',
    },
    unselectedBlockLeft: {
        width: '6px',
        marginTop: '-10px',
        marginBottom: '-10px',
        zIndex: '2',
    }
});