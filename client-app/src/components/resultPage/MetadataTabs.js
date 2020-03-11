import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Button,
    Tooltip,
    ClickAwayListener,
    makeStyles
} from '@material-ui/core';
import formatDate from '../../helpers/formatDate';
import sqlFormatter from 'sql-formatter';
import copy from 'clipboard-copy';

export const TechnicalInfo = ({
    toolType,
    subjectArea,
    updated,
    custodian,
    author,
    supportGroup,
    description,
    database
}) => {
    let classes = useStyles();
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
            <Grid item xs={6} className={classes.infoBox}>
                <Typography className={classes.techInfoTitle}>
                    Author
                </Typography>
                <Typography className={classes.techInfoDetail}>
                    {author}
                </Typography>
                <br></br>

                <Typography className={classes.techInfoTitle}>
                    Support Group
                </Typography>
                <Typography className={classes.techInfoDetail}>
                    {supportGroup}
                </Typography>
                <br></br>

                <Typography className={classes.techInfoTitle}>
                    Data Custodian
                </Typography>
                <Typography className={classes.techInfoDetail}>
                    {custodian}
                </Typography>
                <br></br>

                <Typography className={classes.techInfoTitle}>
                    Known Issues
                </Typography>
                <Typography className={classes.techInfoDetail}>N/A</Typography>
            </Grid>

            <Grid
                item
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
                xs={6}
            >
                <Grid
                    item
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-start"
                >
                    <Grid item xs={4}>
                        <Typography className={classes.techInfoTitle}>
                            Subject Area
                        </Typography>
                        <Typography className={classes.techInfoDetail}>
                            {subjectArea}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.techInfoTitle}>
                            Tool Type
                        </Typography>
                        <Typography className={classes.techInfoDetail}>
                            {toolType}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.techInfoTitle}>
                            Last updated
                        </Typography>
                        <Typography className={classes.techInfoDetail}>
                            {formatDate(updated)}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography className={classes.techInfoDescTitle}>
                        Data description
                    </Typography>
                    <Typography className={classes.techInfoDesc}>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export const SecurityInfo = () => {
    return (
        <Grid container direction="column">
            <Typography variant="body1">
                Security info coming soon...
            </Typography>
        </Grid>
    );
};

export const SqlQuery = ({ sqlQuery }) => {
    let classes = useStyles();
    const [showTooltip, setShowTooltip] = useState(false);

    const handleTooltipClose = () => {
        setShowTooltip(false);
    };

    const handleTooltipOpen = () => {
        setShowTooltip(true);
    };

    const handleOnClick = () => {
        handleTooltipOpen();
        copy(sqlFormatter.format(sqlQuery));
    };

    return (
        <Grid
            container
            direction="row"
            className={(classes.infoBox, classes.inheritHeight)}
        >
            <Grid item xs={11} className={classes.scrollable}>
                <pre className={classes.sqlFormat}>
                    {sqlFormatter.format(sqlQuery)}
                </pre>
            </Grid>
            <Grid item xs={1}>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <div>
                        <Tooltip
                            onClose={handleTooltipClose}
                            open={showTooltip}
                            leaveDelay={1000}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                            title="Copied to clipboard!"
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOnClick}
                            >
                                Copy
                            </Button>
                        </Tooltip>
                    </div>
                </ClickAwayListener>
            </Grid>
        </Grid>
    );
};

export const Definitions = ({ terms }) => {
    let classes = useStyles();
    let term = terms[0];
    console.log(term);
    return (
        <Grid
            container
            direction="row"
            className={(classes.inheritHeight, classes.scrollable)}
        >
            <Grid item xs={12}>
                <Typography className={classes.termDetail}>
                    Click the links below to view the full definitions in{' '}
                    <a className={classes.blue} href="https://metadata.uw.edu/">
                        Knowledge Navigator
                    </a>
                </Typography>
                <br></br>
            </Grid>
            <Grid item>
                {terms.map((term, i) => {
                    return <Term term={term} key={i}></Term>;
                })}
            </Grid>
        </Grid>
    );
};

const Term = ({ term }) => {
    let classes = useStyles();
    return (
        <div>
            <Typography className={classes.termTitle}>
                <a className={classes.blue}>{term.term}</a>
            </Typography>
            <Typography className={classes.termDef}>
                {term.definition}
            </Typography>
            <br></br>
        </div>
    );
};

const useStyles = makeStyles({
    infoBox: {
        backgroundColor: '#F8F8F8',
        padding: '1rem'
    },
    techInfoTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
        color: '#5E5B5B'
    },
    techInfoDetail: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#4B2E83'
    },
    techInfoDescTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1.25rem',
        color: '#5E5B5B'
    },
    techInfoDesc: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem'
    },
    sqlFormat: {
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        color: '#005CB0',
        fontSize: '1rem'
    },
    inheritHeight: {
        height: 'inherit'
    },
    scrollable: {
        height: '90%',
        overflow: 'auto'
    },
    termDetail: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem'
    },
    blue: {
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    termTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem'
    },
    termDef: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '.85rem'
    }
});

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
