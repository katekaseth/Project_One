import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, CardMedia, Divider } from '@material-ui/core';

import VisualizationIcon from '../../icons/svg/visualizationIcon.svg';
import CubeIcon from '../../icons/svg/cubeIcon.svg';
import ReportIcon from '../../icons/svg/reportIcon.svg';

import { TagChip } from '../Chips';
import { Bookmark } from '../Bookmark';
import formatDate from '../../helpers/formatDate';

export const SearchResult = ({ setPage, result, isError }) => {
    const classes = useStyles();

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
                            style={{ marginTop: '-15px' }}
                            isBookmarked={result.isBookmarked}
                            documentId={result.documentID}
                            isError={isError}
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography className={classes.resultDescription} variant='body2'>
                        {result.description}
                    </Typography>
                </Grid>
                <Divider />
                <Grid item container alignItems='center' justify='space-between' style={{paddingTop: 10}}>
                    <Grid item>
                        <Typography variant='body2'>
                            <b>Filters:</b>     {result.subjectArea}, {result.toolType} 
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
        marginLeft: '15px',
        marginBottom: '15px',
        marginRight: '15px',
        marginTop: '5px',
    },
});
