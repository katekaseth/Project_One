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

import { COLORS } from '../../theme';
import { FILTER_OPTIONS } from '../../stringConstants';

export const SearchFilter = ({filterState, updateFilterState}) => {
    return (
        <Paper square>
            {
                Object.keys(FILTER_OPTIONS).map((subjectKey) => {
                    return <FilterGroup filterState={filterState} updateFilterState={updateFilterState} subjectKey={subjectKey}></FilterGroup>
                })
            }
        </Paper>
    );
};

const FilterGroup = ({filterState, updateFilterState, subjectKey}) => {
    const filterGroup = FILTER_OPTIONS[subjectKey];
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
                    <Typography variant='h6'>{filterGroup.groupLabel}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl>
                        {
                            Object.keys(filterGroup.filters).map((filterKey) => {
                                return (
                                    <FormControlLabel
                                        value={filterKey} 
                                        label={filterGroup.filters[filterKey]}
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