import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Chip, Typography, Grid } from '@material-ui/core';

import { STANDARDIZED_CATEOGRY_KEYS } from '../stringConstants';

export const TagChip = ({ label }) => {
    const classes = useStyles();
    return <Chip className={classes.chip} label={label} color='secondary' />;
};

export const DeletableTagChip = ({ subjectKey, filterKey, updateFilterState }) => {
    const classes = useStyles();
    return (
        <Chip
            className={classes.chip}
            label={
                STANDARDIZED_CATEOGRY_KEYS[subjectKey] === undefined
                    ? filterKey
                    : `${STANDARDIZED_CATEOGRY_KEYS[subjectKey]}: ${filterKey}`
            }
            onClick={() => updateFilterState(subjectKey, filterKey)}
            onDelete={() => updateFilterState(subjectKey, filterKey)}
            color='secondary'
        />
    );
};

export const FilterChips = ({ filterState, updateFilterState, clearFilterState }) => {
    let chipArray = [];
    const classes = useStyles();

    Object.keys(filterState).forEach((subjectKey) => {
        Object.keys(filterState[subjectKey]).forEach((filterKey) => {
            filterState[subjectKey][filterKey] &&
                chipArray.push(
                    <DeletableTagChip
                        updateFilterState={updateFilterState}
                        subjectKey={subjectKey}
                        filterKey={filterKey}
                    />,
                );
        });
    });

    chipArray.length &&
        chipArray.push(
            <Typography onClick={clearFilterState} classes={classes} variant='button'>
                Clear All
            </Typography>,
        );

    return (
        <Grid xs item container direction='row' alignItems='center' compontent='span'>
            {chipArray}
        </Grid>
    );
};

const useStyles = makeStyles({
    chip: {
        marginRight: '10px',
    },
    root: {
        '&:hover': {
            textDecoration: 'underline',
        },
        fontSize: '8pt',
        cursor: 'pointer',
        color: 'gray',
        paddingTop: '4px',
    },
});
