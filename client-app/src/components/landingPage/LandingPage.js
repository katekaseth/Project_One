import React from "react";
import { Grid, Card, CardContent, makeStyles } from "@material-ui/core";
import "./LandingPage.css";
import hr_icon from "../../icons/hr.png";
import kateka from "../../images/kateka.png";

import { CapstoneLandingInfo } from "./CapstoneLandingInfo";

const useStyles = makeStyles({
  img: {
    borderRadius: "50%",
    width: "50%",
    height: "50%"
  }
});

export default function LandingPage() {
  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}>
        <Grid item xs={4}>
          <h1 className="title">UW Analytics</h1>
        </Grid>

        <Grid item xs={6}>
          <p className="subtitle">
            We are creating a consolidated data platform that enables UW
            academic and administrative units to efficiently and easily navigate
            the University’s data so they can achieve more with analytics.
          </p>
        </Grid>
      </Grid>

      <Grid container direction="row">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src={hr_icon}></img>
              <p>helloood askdlfjale lsdjfoieuwpar aslkdfjaei </p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src={hr_icon}></img>
              <p>helloood askdlfjale lsdjfoieuwpar aslkdfjaei </p>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <img src={hr_icon}></img>
              <p>helloood askdlfjale lsdjfoieuwpar aslkdfjaei </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <PersonaCards></PersonaCards>
      <CapstoneLandingInfo></CapstoneLandingInfo>
    </div>
  );
}

function PersonaCards() {
  const classes = useStyles();

  return (
    <div>
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <h2 className="title2">We're making your job easier.</h2>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing="5"
        style={{ minWidth: "100vw" }}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src={kateka} className={classes.img}></img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                iste.
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src={kateka} className={classes.img}></img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                iste.
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src={kateka} className={classes.img}></img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                iste.
              </p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <img src={kateka} className={classes.img}></img>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem
                repellendus quasi fuga nesciunt dolorum nulla magnam veniam
                sapiente, fugiat! Commodi sequi non animi ea dolor molestiae
                iste.
              </p>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
