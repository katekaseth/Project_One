import React from "react";
import { Grid, Card, CardContent, Fade, makeStyles } from "@material-ui/core";
import "./LandingPage.css";
import kateka from "../../images/kateka.png";
import shop from "../../icons/online-shop.png";
import qa from "../../icons/q&a.png";
import graph from "../../icons/graph.png";

import p1 from "../../images/p1.png";
import p2 from "../../images/p2.png";
import p3 from "../../images/p3.png";
import p4 from "../../images/p4.png";

import { CapstoneLandingInfo } from "./CapstoneLandingInfo";

const useStyles = makeStyles({
  img: {
    borderRadius: "50%",
    width: "90%",
    height: "90%"
  }
});

export default function LandingPage() {
  return (
    <div>
      <Title></Title>
      <DescriptionCards></DescriptionCards>
      <PersonaCards></PersonaCards>
      <CapstoneLandingInfo></CapstoneLandingInfo>
    </div>
  );
}

function Title() {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: "100vh" }}
      className="uw-background">
      <Grid item>
        <h1 className="title">UW Analytics</h1>
      </Grid>

      <Grid item xs={6}>
        <p className="subtitle">
          We are creating a consolidated data platform that enables UW academic
          and administrative units to efficiently and easily navigate the
          University’s data so they can achieve more with analytics.
        </p>
      </Grid>
    </Grid>
  );
}

function DescriptionCards() {
  const data = [
    {
      imgSrc: graph,
      title: "Efficient Design",
      desc:
        "A streamline design flows allows you to find what you need faster and explore useful data previously buried in clunky UI."
    },
    {
      imgSrc: shop,
      title: "One-Stop Shop",
      desc:
        "With all University data aggregated in one place, time will no longer be wasted on looking for the right portal."
    },
    {
      imgSrc: qa,
      title: "Informed Decisions",
      desc:
        "Use our portal to answer questions about the University and make informed decisions supported by data."
    }
  ];
  return (
    <Grid container direction="row">
      {data.map(elem => {
        return (
          <Grid item xs={12} md={4}>
            <Card className="no-round-corner">
              <CardContent style={{ marginTop: "25px" }}>
                <img src={elem.imgSrc}></img>
                <h3>{elem.title}</h3>
                <p className="centerPadding">{elem.desc}</p>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

function PersonaCards() {
  const classes = useStyles();
  const personaData = [
    {
      imgSrc: p1,
      name: "Dean"
    },
    {
      imgSrc: p2,
      name: "Advisor"
    },
    {
      imgSrc: p3,
      name: "Researcher"
    },
    {
      imgSrc: p4,
      name: "Analyst"
    }
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className="gray-background">
      <Grid item>
        <h2>We're making your job easier.</h2>
      </Grid>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing="5"
        className="centerPadding">
        {personaData.map(elem => {
          return (
            <Grid item md={3}>
              <Card className="no-box-shadow gray-background">
                <CardContent>
                  <img src={elem.imgSrc} className={classes.img}></img>
                  <h3>{elem.name}</h3>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        item
        xs={12}
        className="centerPadding"
        style={{ marginBottom: "30px" }}>
        <p>
          These are just a few job titles within University of Washington that
          need the data provided by our portal. A better portal means more time
          analyzing data and less time looking for it.
        </p>
      </Grid>
    </Grid>
  );
}
