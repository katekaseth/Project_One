import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, CardMedia, Divider, Collapse } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';

import VisualizationIcon from '../../icons/svg/visualizationIcon.svg';
import CubeIcon from '../../icons/svg/cubeIcon.svg';
import ReportIcon from '../../icons/svg/reportIcon.svg';

import { Bookmark } from '../Bookmark';
import formatDate from '../../helpers/formatDate';

export const SearchResult = ({ setPage, result, alertError }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [descriptionHeights, setDescriptionHeights] = useState({});

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

    const changeExpanded = (e) => {
        setExpanded(!expanded);
        e.stopPropagation();
    };

    const calcHeight = (node, documentId) => {
        if (node && !descriptionHeights[documentId]) {
            let temp = { ...descriptionHeights };
            temp[documentId] = node.offsetHeight;
            setDescriptionHeights(temp);
        }
    };

    return (
        <Paper
            onClick={() => setPage.result(result.documentID)}
            square
            className={classes.searchResult}
        >
            <Grid container direction='column'>
                <Grid item container justify='space-between'>
                    <Grid xs item container alignItems='center'>
                        <CardMedia
                            className={
                                result.toolType === toolTypes.visualization
                                    ? classes.visualizationIcon
                                    : classes.icon
                            }
                            src={toolTypeIcon}
                            component='img'
                        />
                        <Typography
                            onClick={() => setPage.result(result.documentID)}
                            className={classes.resultTitle}
                            variant='h6'
                        >
                            {result.title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Bookmark
                            key={uuidv4()}
                            style={{ marginTop: '-15px' }}
                            isBookmarked={result.isBookmarked}
                            documentId={result.documentID}
                            alertError={alertError}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Collapse in={expanded} collapsedHeight={54}>
                        <Typography
                            ref={(node) => calcHeight(node, result.documentID)}
                            className={classes.resultDescription}
                            variant='body2'
                        >
                            {result.description}
                        </Typography>
                    </Collapse>

                    <Typography
                        className={classes.seeMore}
                        variant='body2'
                        onClick={changeExpanded}
                    >
                        {descriptionHeights[result.documentID] > 54 &&
                            (expanded ? 'See less' : 'See more')}
                    </Typography>
                </Grid>
                <Divider />
                <Grid
                    item
                    container
                    className={classes.tagContainer}
                    alignItems='center'
                    justify='space-between'
                >
                    <Grid item>
                        <Typography variant='body2'>
                            <b>Tags:</b> {result.subjectArea}, {result.toolType}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body2'>
                            {`Updated ${formatDate(result.updated)}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

const useStyles = makeStyles({
    searchResult: {
        marginTop: '20px',
        paddingTop: '15px',
        paddingBottom: '15px',
        paddingRight: '40px',
        paddingLeft: '20px',
        boxSizing: 'border-box',
        width: '100%',
    },
    resultTitle: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    icon: {
        width: '30px',
        height: '30px',
        paddingRight: '5px',
    },
    visualizationIcon: {
        width: '30px',
        height: '30px',
        paddingRight: '5px',
        paddingBottom: '5px',
    },
    resultDescription: {
        marginRight: '15px',
        marginTop: '15px',
    },
    tagContainer: {
        marginTop: '10px',
    },
    seeMore: {
        color: 'gray',
        marginBottom: '15px',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
});
