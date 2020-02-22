import React from 'react';
import { 
    Grid, 
    Paper, 
    ExpansionPanel, 
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Radio,
    FormControlLabel,
    FormControl,
    Typography
} from '@material-ui/core';

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

    return (
        <Grid>
            <ExpansionPanel>
                <ExpansionPanelSummary>
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
                                        control={<Radio onClick={() => updateFilterState(subjectKey, filterKey)} checked={filterState[subjectKey][filterKey]} />}
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