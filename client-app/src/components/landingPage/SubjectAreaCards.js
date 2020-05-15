import React from 'react';
import { Grid } from "@material-ui/core";

import { SubjectAreaCard } from './SubjectAreaCard';
import { SUBJECT_AREA_ICONS } from '../../stringConstants';
import bookmarkIcon from '../../icons/svg/whiteBookmark.svg';

export function SubjectAreaCards({ setPage, setSelectedSubject }) {
    const selectSubjectArea = filterKey => {
        setSelectedSubject(filterKey);
        setPage.search();
    };
    return (
        <Grid container xs={10} justify='center'>
            {Object.keys(SUBJECT_AREA_ICONS).map(filterKey => {
                return (
                    <Grid item>
                        <SubjectAreaCard
                            onClick={() => selectSubjectArea(filterKey)}
                            title={filterKey}
                            icon={SUBJECT_AREA_ICONS[filterKey]}
                            BOOKMARK={false}
                        />
                    </Grid>
                );
            })}
            <Grid item >
                 <SubjectAreaCard 
                    onClick={() => setPage.bookmarks()}
                    title={"Bookmarks"}
                    icon={bookmarkIcon}
                    BOOKMARK={true}
                />
            </Grid>
        </Grid>
    );
}