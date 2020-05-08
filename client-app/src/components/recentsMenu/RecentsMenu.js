import React from 'react';
import { Grid, Popover, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import VisualizationIcon from '../../icons/svg/visualizationIcon.svg';
import CubeIcon from '../../icons/svg/cubeIcon.svg';
import ReportIcon from '../../icons/svg/reportIcon.svg';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { RECENTS } from '../../stringConstants';

export const RecentsMenu = ({ recents, className, setPage }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    let order = JSON.parse(localStorage.getItem(RECENTS));
    order && order.reverse();
    let orderedRecents = null;
    if (order !== null && recents !== null) {
        orderedRecents = order.map((documentId) => {
            let orderedResult = null;
            recents.forEach((result) => {
                if (result.documentID === documentId) {
                    orderedResult = result;
                    return;
                }
            });
            return orderedResult;
        });
    }

    return (
        <div>
            <Grid container onClick={handlePopoverOpen} className={className}>
                {'Recents'}
                <ArrowDropDownIcon />
            </Grid>
            <Popover
                PaperProps={{ square: true }}
                className={classes.popup}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                onClose={handlePopoverClose}
            >
                <Grid container direction='column' className={classes.popupContent}>
                    <Typography variant='body1' className={classes.mostRecentText}>
                        {orderedRecents ? 'Most Recent' : 'No recents saved'}
                    </Typography>
                    {orderedRecents &&
                        orderedRecents.map((result) => {
                            return (
                                <RecentLink
                                    handlePopoverClose={handlePopoverClose}
                                    key={result.documentID}
                                    result={result}
                                    setPage={setPage}
                                />
                            );
                        })}
                </Grid>
            </Popover>
        </div>
    );
};

const RecentLink = ({ result, setPage, handlePopoverClose }) => {
    const classes = useStyles();
    const handleClick = () => {
        handlePopoverClose();
        setPage.result(result.documentID);
    };

    const toolTypes = {
        visualization: 'Visualization',
        cube: 'Cube',
        report: 'Report',
    };

    let toolTypeIcon;
    switch (result.toolType) {
        case toolTypes.visualization:
            toolTypeIcon = VisualizationIcon;
            break;
        case toolTypes.cube:
            toolTypeIcon = CubeIcon;
            break;
        case toolTypes.report:
            toolTypeIcon = ReportIcon;
            break;
        default:
            toolTypeIcon = <div></div>;
    }

    return (
        <Grid container className={classes.listItem}>
            <CardMedia
                className={
                    result.toolType === toolTypes.visualization
                        ? classes.visualizationIcon
                        : classes.icon
                }
                src={toolTypeIcon}
                component='img'
            />
            <Typography variant='body2' className={classes.link} onClick={handleClick}>
                {result.title}
            </Typography>
        </Grid>
    );
};

const useStyles = makeStyles({
    popup: {
        marginTop: '20px',
    },
    popupContent: {
        padding: '13px',
    },
    mostRecentText: {
        color: 'gray',
        marginBottom: '5px',
    },
    link: {
        '&:hover': {
            textDecoration: 'underline',
        },
        cursor: 'pointer',
    },
    icon: {
        width: '15px',
        height: '15px',
        paddingRight: '5px',
    },
    visualizationIcon: {
        width: '15px',
        height: '15px',
        paddingRight: '5px',
        paddingBottom: '5px',
    },
    listItem: {
        marginBottom: '5px',
    },
});
