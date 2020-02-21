import React from 'react';

import { Chip } from '@material-ui/core';
import { FILTER_OPTIONS } from '../stringConstants';

export const TagChip = ({label}) => {
    return (
        <Chip label={label} color="primary"/>
    );
};

export const DeletableTagChip = ({label, subjectKey, filterKey, changeFilter}) => {
    return (
        <Chip label={label} onClick={() => changeFilter(subjectKey, filterKey)} onDelete={() => changeFilter(subjectKey, filterKey)} color="primary"/>
    );
};

export const FilterChips = ({filterState, changeFilter}) => {
    let chipArray = [];

    Object.keys(filterState).forEach(subjectKey => {
        Object.keys(filterState[subjectKey]).forEach(filterKey => {
            filterState[subjectKey][filterKey] && chipArray.push(
                <DeletableTagChip 
                    changeFilter={changeFilter}
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