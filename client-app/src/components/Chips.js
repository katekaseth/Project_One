import React from 'react';

import { Chip } from '@material-ui/core';
import { FILTER_OPTIONS } from '../stringConstants';

export const TagChip = ({label}) => {
    return (
        <Chip label={label} color="primary"/>
    );
};

export const DeletableTagChip = ({label, subjectKey, filterKey, updateFilterState}) => {
    return (
        <Chip label={label} onClick={() => updateFilterState(subjectKey, filterKey)} onDelete={() => updateFilterState(subjectKey, filterKey)} color="primary"/>
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