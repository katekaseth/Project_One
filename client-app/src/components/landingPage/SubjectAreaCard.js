import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Paper, CardContent, CardActionArea, CardMedia, Typography, Grid } from "@material-ui/core";

export function SubjectAreaCard({ title, icon, onClick }) {
    const classes = useStyles();
    return (
        <Paper square className={classes.card}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Grid
                        className={classes.content}
                        container
                        direction="column"
                        justify="space-between"
                    >
                        <Grid xs item container direction="column" alignItems="center">
                            <CardMedia className={classes.icon} src={icon} component="img" />
                            <Typography className={classes.cardTitle} variant="h6">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.seeMore} variant="body2">
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
    content: {
        width: "200px",
        height: "200px",
        paddingTop: "30px",
    },
    cardTitle: {
        textTransform: "uppercase",
    },
    seeMore: {
        "&:hover": {
            textDecoration: "underline",
        },
    },
    icon: {
        width: "70px",
        height: "70px",
    },
});
