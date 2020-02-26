import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Grid, 
    Paper, 
    ExpansionPanel, 
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Checkbox,
    FormControlLabel,
    FormControl,
    Typography,
    Box
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const SearchFilter = ({filterState, updateFilterState}) => {
    return (
        <Paper square>
            {
                Object.keys(filterState).map((subjectKey) => {
                    return <FilterGroup filterState={filterState} updateFilterState={updateFilterState} subjectKey={subjectKey}></FilterGroup>
                })
            }
        </Paper>
    );
};

const FilterGroup = ({filterState, updateFilterState, subjectKey}) => {
    const [expanded, setExpanded] = useState(Object.values(filterState[subjectKey]).includes(true));
    const classes = useStyles();

    return (
        <Grid>
            <ExpansionPanel 
                className={classes.panel} 
                defaultExpanded={expanded}
                onChange={(e, expanded) => {
                    setExpanded(expanded);
                }}
            >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography variant='h6'>{subjectKey}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl>
                        {
                            Object.keys(filterState[subjectKey]).map((filterKey) => {
                                return (
                                    <FormControlLabel
                                        value={filterKey} 
                                        label={filterKey}
                                        control={<Checkbox color='primary' onClick={() => updateFilterState(subjectKey, filterKey)} checked={filterState[subjectKey][filterKey]} />}
                                    />
                                )
                            })
                        }
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Grid>
    )
}

const useStyles = makeStyles({
    panel: {
        borderRadius: '0px !important'
    }
});