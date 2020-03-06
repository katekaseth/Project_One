import React from 'react';
import { Grid } from '@material-ui/core';

import { SubjectAreaCard } from './SubjectAreaCard';
import { SUBJECT_AREA_ICONS } from '../../stringConstants';

export function SubjectAreaCards({ setPage, setSelectedSubject }) {
    const selectSubjectArea = filterKey => {
        setSelectedSubject(filterKey);
        setPage.search();
    };

    return (
        <Grid container xs={7} justify='center'>
            {Object.keys(SUBJECT_AREA_ICONS).map(filterKey => {
                return (
                    <Grid item>
                        <SubjectAreaCard
                            onClick={() => selectSubjectArea(filterKey)}
                            title={filterKey}
                            icon={SUBJECT_AREA_ICONS[filterKey]}
                        />
                    </Grid>
                );
            })}
        </Grid>
    );
}
