import React from 'react';
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { SubjectAreaCard } from './SubjectAreaCard';
import { SUBJECT_AREA_ICONS } from '../../stringConstants';
import bookmarkIcon from '../../icons/svg/whiteBookmark.svg';

export function SubjectAreaCards({ setPage, setSelectedSubject }) {
    const selectSubjectArea = filterKey => {
        setSelectedSubject(filterKey);
        setPage.search();
    };
    const classes = useStyles();
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
                 <SubjectAreaCard className={classes.bookmarkCard}
                    onClick={() => setPage.bookmarks()}
                    title={"Bookmarks"}
                    icon={bookmarkIcon}
                    BOOKMARK={true}
                />
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles({
    bookmarkCard: {
        backgroundColor: "#f2d9ff",
    },
});