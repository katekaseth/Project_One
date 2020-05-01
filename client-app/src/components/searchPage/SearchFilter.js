import React from 'react';
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

import { STANDARDIZED_CATEOGRY_KEYS, CATEGORY_DESCRIPTIONS } from '../../stringConstants';

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
                    <Typography variant='h6'>
                        {STANDARDIZED_CATEOGRY_KEYS[subjectKey] === undefined
                            ? subjectKey
                            : STANDARDIZED_CATEOGRY_KEYS[subjectKey]}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                        {CATEGORY_DESCRIPTIONS[subjectKey] !== undefined && (
                            <Typography className={classes.description} variant='body2'>
                                {CATEGORY_DESCRIPTIONS[subjectKey]}
                            </Typography>
                        )}
                        <FormControl>
                            {Object.keys(filterState[subjectKey]).map((filterKey) => {
                                return (
                                    <FormControlLabel
                                        value={filterKey}
                                        label={filterKey}
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
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </Grid>
    );
};

const useStyles = makeStyles({
    panel: {
        borderRadius: '0px !important',
    },
    description: {
        marginTop: '-20px',
        fontStyle: 'italic',
        color: 'gray',
    },
});
