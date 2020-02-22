import React from 'react';
import { Grid } from '@material-ui/core';

import { SubjectAreaCard } from './SubjectAreaCard';
import { FILTER_OPTIONS } from '../../stringConstants';

export  function SubjectAreaCards({setPage, updateFilterState}) {
    const { SUBJECT_AREA } = FILTER_OPTIONS;

    const selectSubjectArea = (filterKey) => {
        updateFilterState('SUBJECT_AREA', filterKey)
        setPage.search();
    };

    return (
        <Grid
            container
            xs={7}
            justify='center'
        >
            {
                Object.keys(SUBJECT_AREA.filters).map(filterKey => {
                    return (
                        <Grid item>
                            <SubjectAreaCard
                                onClick={() => selectSubjectArea(filterKey)}
                                title={SUBJECT_AREA.filters[filterKey]} 
                                icon={SUBJECT_AREA.icons[filterKey]}
                            />
                        </Grid>
                    );
                })
            }
        </Grid>
    )
}

/*
    <Grid item>
        <SubjectAreaCard title='Services & Resources'icon={servicesIcon} />
    </Grid>
*/