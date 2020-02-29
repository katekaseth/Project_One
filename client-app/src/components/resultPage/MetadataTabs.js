import React from 'react';
import { 
    Grid, 
    Typography,
} from '@material-ui/core';

export const TechnicalInfo = ({toolType, subjectArea, created, updated, custodian, author, database}) => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>
                Tool Type: {toolType}
            </Typography>
            <Typography variant='body1'>
                Subject Area: {subjectArea}
            </Typography>
            <Typography variant='body1'>
                Created On: {created}
            </Typography>
            <Typography variant='body1'>
                Updated On: {updated}
            </Typography>
            <Typography variant='body1'>
                Custodian: {custodian}
            </Typography>
            <Typography variant='body1'>
                Author: {author}
            </Typography>
            <Typography variant='body1'>
                Database: {database}
            </Typography>
        </Grid>
    );
};

export const SecurityInfo = () => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>
                Security info coming soon...
            </Typography>
        </Grid>
    );
};

export const SqlQuery = ({sqlQuery}) => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>
                {sqlQuery}
            </Typography>
        </Grid>
    );
};

export const Definitions = () => {
    return (
        <Grid container direction='column'>
            <Typography variant='body1'>
                Definitions coming soon...
            </Typography>
        </Grid>
    );
};

    /*
    toolType: "Report"
    title: "How Many Students By College"
    created: "2012-10-15T00:00:00Z"
    updated: "2012-12-04T00:00:00Z"
    custodian: "University Registrar and Chief Officer of Enrollment Information Services"
    author: "Gordon Moll, Ann Wunderlin"
    description: "Displays a graph of the unduplicated headcount by College or School as of Census Day for a specified quarter for the past ten years. Excluded from these counts are foreign study students, on leave stu"
    subjectArea: "Financial Resources"
    sqlQuery: "SELECT       AcctngMonth,   SUM(DebitSumAmt) AS Debit,   SUM(CreditSumAmt) AS Credit FROM        GLDataMart.sec.TransGLSummary WHERE       (GLAccountCode = '1160') AND (BienniumYear =@BienniumYear) GROUP BY   AcctngMonth ORDER BY                AcctngMonth"
    database: "EDWAdminMart"
    */