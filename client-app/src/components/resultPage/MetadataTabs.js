import React, { useState } from 'react';
import {
    Grid,
    Typography,
    Tooltip,
    ClickAwayListener,
    makeStyles,
    IconButton,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import GetAppIcon from '@material-ui/icons/GetApp';
import formatDate from '../../helpers/formatDate';
import sqlFormatter from 'sql-formatter';
import copy from 'clipboard-copy';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export const TechnicalInfo = ({
    toolType,
    subjectArea,
    updated,
    custodian,
    author,
    supportGroup,
    description,
    database,
}) => {
    let classes = useStyles();
    return (
        <Grid container direction='row' justify='space-evenly' alignItems='flex-start'>
            <Grid item xs={5} className={classes.infoBox}>
                <Typography className={classes.techInfoTitle}>Author</Typography>
                <Typography className={classes.techInfoDetail}>{author}</Typography>
                <br></br>

                <Typography className={classes.techInfoTitle}>Support Group</Typography>
                <Typography className={classes.techInfoDetail}>{supportGroup}</Typography>
                <br></br>

                <Typography className={classes.techInfoTitle}>Data Custodian</Typography>
                <Typography className={classes.techInfoDetail}>{custodian}</Typography>
                <br></br>

                <Typography className={classes.techInfoTitle}>Known Issues</Typography>
                <Typography className={classes.techInfoDetail}>N/A</Typography>
            </Grid>

            <Grid item xs={1}></Grid>

            <Grid
                item
                container
                direction='column'
                justify='flex-start'
                alignItems='flex-start'
                spacing={3}
                xs={5}
            >
                <Grid item container direction='row' justify='space-evenly' alignItems='flex-start' spacing={8} style={{padding: 20}}>
                    <Grid item xs={4}>
                        <Typography className={classes.techInfoTitle}>Subject Area</Typography>
                        <Typography className={classes.techInfoDetail}>{subjectArea}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.techInfoTitle}>Tool Type</Typography>
                        <Typography className={classes.techInfoDetail}>{toolType}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.techInfoTitle}>Last updated</Typography>
                        <Typography className={classes.techInfoDetail}>
                            {formatDate(updated)}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography className={classes.techInfoDescTitle}>Data description</Typography>
                    <Typography className={classes.techInfoDesc}>{description}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export const SecurityInfo = () => {
    let classes = useStyles();
    return (
        <Grid container direction='row' justify='space-evenly'>
            <Grid item xs={5} className={classes.infoBox}>
                <Typography className={classes.securityTitle}>
                    Role(s) with full access to this report:
                </Typography>
                <ul className={classes.securityListItem}>
                    <li>Admin</li>
                    <li>Manager</li>
                    <li className={classes.purpleBold}>FiscalTech</li>
                    <li>Analyst - Academic</li>
                    <li>Analyst - Administrative</li>
                </ul>
            </Grid>

            <Grid item xs={1}></Grid>

            <Grid item xs={5} className={classes.infoBox}>
                <Typography className={classes.securityTitle}>Your Role(s):</Typography>
                <ul className={classes.securityListItem}>
                    <li>Adviser/Academic Staff</li>
                    <li className={classes.purpleBold}>Fiscal Tech</li>
                </ul>
            </Grid>
        </Grid>
    );
};

export const SqlQuery = ({ sqlQuery, title }) => {
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
        copy(sqlFormatter.format(sqlQuery, { indent: '    ' }));
    };

    // refer to: https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react
    const handleFileDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([document.getElementById('sqlCode').innerHTML], {
            type: 'text/plain',
        });
        element.href = URL.createObjectURL(file);
        // replace title spaces with underscore
        element.download = title.replace(/ /g, '_') + 'code.sql';
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
    };

    return (
        <Grid
            container
            direction='row'
            className={
                (classes.infoBox, classes.inheritHeight, classes.leftPadding, classes.scrollable)
            }
        >
            <Grid item xs={12} className={classes.sqlContainer}>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Grid className={classes.sqlIcons}>
                        <IconButton onClick={handleFileDownload}>
                            <GetAppIcon className={classes.icon} />
                        </IconButton>
                        <Tooltip
                            onClose={handleTooltipClose}
                            open={showTooltip}
                            leaveDelay={1000}
                            title='Copied to clipboard!'
                        >
                            <IconButton onClick={handleOnClick}>
                                <FileCopyIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </ClickAwayListener>
                <SyntaxHighlighter
                    id='sqlCode'
                    language='sql'
                    style={monokai}
                    showLineNumbers={true}
                    wrapLines={true}
                >
                    {sqlFormatter.format(sqlQuery, { indent: '    ' })}
                </SyntaxHighlighter>
            </Grid>
        </Grid>
    );
};

export const Definitions = ({ terms }) => {
    let classes = useStyles();

    return (
        <Grid alignItems='flex-start'
            container
            direction='row'
            className={(classes.inheritHeight, classes.leftPadding, classes.scrollable)}
        >
            <Grid item>
                <Typography className={classes.termDetail}>
                    View the full definitions in{' '}
                    <a className={classes.blue} href='https://metadata.uw.edu/'>
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
            <Typography className={classes.termDef}>{term.definition}</Typography>
            <br></br>
        </div>
    );
};

const useStyles = makeStyles({
    infoBox: {
        backgroundColor: '#F8F8F8',
        padding: '1rem',
    },
    techInfoTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
        color: '#5E5B5B',
    },
    techInfoDetail: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#4B2E83',
    },
    techInfoDescTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1.25rem',
        color: '#5E5B5B',
    },
    techInfoDesc: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
    },
    securityTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
        fontWeight: 'bold',
        color: '#5E5B5B',
    },
    securityListItem: {
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '1rem',
    },
    inheritHeight: {
        height: 'inherit',
    },
    scrollable: {
        maxHeight: '700px',
        overflowY: 'auto',
    },
    leftPadding: {
        paddingLeft: '1rem',
    },
    termDetail: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
    },
    purpleBold: {
        color: '#4B2E83',
        fontWeight: 'bold',
    },
    blue: {
        color: 'blue',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    termTitle: {
        fontFamily: 'Encode-sans, sans-serif',
        fontSize: '1rem',
    },
    termDef: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '.9rem',
        paddingRight: '.5rem',
    },
    sqlIcons: {
        position: 'absolute',
        top: '0',
        right: '0',
        marginTop: '15px',
        marginRight: '10px',
    },
    sqlContainer: {
        position: 'relative',
        width: '100px',
    },
    icon: {
        color: '#e5e5e5',
    },
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
