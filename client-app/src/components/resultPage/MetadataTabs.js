import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import formatDate from '../../helpers/formatDate';

export const TechnicalInfo = ({
    toolType,
    subjectArea,
    updated,
    custodian,
    author,
    supportGroup,
    database,
}) => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>Tool Type: {toolType}</Typography>
            <Typography variant='body1'>Subject Area: {subjectArea}</Typography>
            <Typography variant='body1'>Updated On: {formatDate(updated)}</Typography>
            <Typography variant='body1'>Custodian: {custodian}</Typography>
            <Typography variant='body1'>Author: {author}</Typography>
            <Typography variant='body1'>Database: {database}</Typography>
            <Typography variant='body1'>supportGroup: {supportGroup}</Typography>
        </Grid>
    );
};

export const SecurityInfo = () => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>Security info coming soon...</Typography>
        </Grid>
    );
};

export const SqlQuery = ({ sqlQuery }) => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>{sqlQuery}</Typography>
        </Grid>
    );
};

export const Definitions = () => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>Definitions coming soon...</Typography>
        </Grid>
    );
};

/*
   "title": "How Many Students By College",
   "toolType": "Report",
   "created": "2012-10-15T00:00:00Z",
   "updated": "2012-12-04T00:00:00Z",
   "custodian": "John Doe",
   "author": "Jane Doe",
   "description": "Displays a graph...",
   "subjectArea": "Financial Resources",
   "sqlQuery": "SELECT * FROM student",
   "supportGroup": "Enrollment Information Services",
   "database": "EDWAdminMart",
   "terms": [
     {
       "term": "Department",
       "definition": "An organization unit at..."
     },
     {
       "term": "Department",
       "definition": "An organization unit at..."
     }
   ]
*/