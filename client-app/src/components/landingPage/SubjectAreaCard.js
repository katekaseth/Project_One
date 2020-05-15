import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, CardContent, CardActionArea, CardMedia, Typography, Grid } from "@material-ui/core";

export function SubjectAreaCard({ title, icon, onClick, BOOKMARK }) {
    const classes = useStyles();
    return (
        <Paper square className={BOOKMARK ? classes.coloredCard : classes.card}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Grid
                        className={classes.content}
                        container
                        direction="column"
                        justify="space-between"
                    >
                        <Grid xs item container direction="column" alignItems="center" justify="space-evenly">
                            <CardMedia className={classes.icon} src={icon} component="img" />
                            <Typography className={BOOKMARK ? classes.coloredCardTitle : classes.cardTitle} variant="h6">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={BOOKMARK ? classes.coloredSeeMore : classes.seeMore} variant="body2">
                                See More >
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Paper>
    );
}

const useStyles = makeStyles({
    card: {
        margin: "15px",
    },
    coloredCard: {
        margin: "15px",
        backgroundColor: "#4b2e83",
    },
    content: {
        width: "200px",
        height: "200px",
        paddingTop: "30px",
    },
    cardTitle: {
        textTransform: "uppercase",
    },
    coloredCardTitle: {
        textTransform: "uppercase",
        color: "white",
    },
    seeMore: {
        "&:hover": {
            textDecoration: "underline",
        },
    },
    coloredSeeMore: {
        color: 'white',
        "&:hover": {
            textDecoration: "underline",
        },
    },
    icon: {
        width: "70px",
        height: "70px",
    },
});
