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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export const SearchFilter = ({
    filterState,
    updateFilterState,
    expandedFilterGroups,
    changeFilterExpansion,
}) => {
    return (
        <Paper square>
            {Object.keys(filterState).map((subjectKey) => {
                return (
                    <FilterGroup
                        filterState={filterState}
                        updateFilterState={updateFilterState}
                        expanded={expandedFilterGroups[subjectKey]}
                        setExpanded={() => changeFilterExpansion(subjectKey)}
                        subjectKey={subjectKey}
                    ></FilterGroup>
                );
            })}
        </Paper>
    );
};

const FilterGroup = ({ expanded, setExpanded, filterState, updateFilterState, subjectKey }) => {
    const classes = useStyles();

    const changeFilter = (subjectKey, filterKey) => {
        updateFilterState(subjectKey, filterKey);
    };

    return (
        <Grid>
            <ExpansionPanel className={classes.panel} expanded={expanded} onClick={setExpanded}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant='h6'>{subjectKey}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormControl>
                        {Object.keys(filterState[subjectKey]).map((filterKey) => {
                            return (
                                <FormControlLabel
                                    value={filterKey}
                                    label={
                                        subjectKey === 'Accessable'
                                            ? filterKey.charAt(0).toUpperCase() + filterKey.slice(1)
                                            : filterKey
                                    }
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    control={
                                        <Checkbox
                                            color='primary'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                changeFilter(subjectKey, filterKey);
                                            }}
                                            checked={filterState[subjectKey][filterKey]}
                                        />
                                    }
                                />
                            );
                        })}
                    </FormControl>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Grid>
    );
};

const useStyles = makeStyles({
    panel: {
        borderRadius: '0px !important',
    },
});
