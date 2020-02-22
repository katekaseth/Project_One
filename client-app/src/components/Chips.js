import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import { Chip } from '@material-ui/core';
import { FILTER_OPTIONS } from '../stringConstants';

export const TagChip = ({label}) => {
    const classes = useStyles();
    return (
        <Chip className={classes.chip} label={label} color="primary"/>
    );
};

export const DeletableTagChip = ({label, subjectKey, filterKey, updateFilterState}) => {
    const classes = useStyles();
    return (
        <Chip className={classes.chip} label={label} onClick={() => updateFilterState(subjectKey, filterKey)} onDelete={() => updateFilterState(subjectKey, filterKey)} color="primary"/>
    );
};

export const FilterChips = ({filterState, updateFilterState}) => {
    let chipArray = [];

    Object.keys(filterState).forEach(subjectKey => {
        Object.keys(filterState[subjectKey]).forEach(filterKey => {
            filterState[subjectKey][filterKey] && chipArray.push(
                <DeletableTagChip 
                    updateFilterState={updateFilterState}
                    label={FILTER_OPTIONS[subjectKey].filters[filterKey]} 
                    subjectKey={subjectKey} 
                    filterKey={filterKey}
                />
            );
        });
    });

    return(
        chipArray
    );
};

const useStyles = makeStyles({
    chip: {
        marginRight: '10px',
    },
});