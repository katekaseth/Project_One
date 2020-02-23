import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import { Chip, Typography } from '@material-ui/core';
import { FILTER_OPTIONS } from '../stringConstants';

export const TagChip = ({label}) => {
    const classes = useStyles();
    return (
        <Chip className={classes.chip} label={label} color='secondary'/>
    );
};

export const DeletableTagChip = ({label, subjectKey, filterKey, updateFilterState}) => {
    const classes = useStyles();
    return (
        <Chip 
            className={classes.chip} 
            label={label} onClick={() => updateFilterState(subjectKey, filterKey)} 
            onDelete={() => updateFilterState(subjectKey, filterKey)} 
            color='secondary'
        />
    );
};

export const FilterChips = ({filterState, updateFilterState, clearFilterState}) => {
    let chipArray = [];
    const classes = useStyles();

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

    chipArray.length && chipArray.push(
        <Typography onClick={clearFilterState} classes={classes} variant='button'>Clear All</Typography>
    );

    return(
        chipArray
    );
};

const useStyles = makeStyles({
    chip: {
        marginRight: '10px',
    },
    root: {
        '&:hover': {
            textDecoration: 'underline'
        },
        fontSize: '8pt',
        cursor: 'pointer'
    }
});