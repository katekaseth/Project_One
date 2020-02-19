import React from "react";
import { Grid, Card, CardContent, Slide, makeStyles } from "@material-ui/core";
import "./LandingPage.css";

import shop from "../../icons/online-shop.png";
import qa from "../../icons/q&a.png";
import graph from "../../icons/graph.png";
import p1 from "../../images/p1.png";
import p2 from "../../images/p2.png";
import p3 from "../../images/p3.png";
import p4 from "../../images/p4.png";

import { CapstoneLandingInfo } from "./CapstoneLandingInfo";

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
      <Slide direction="down" in={true} timeout={700}>
        <Grid item>
          <h1 className="title">UW Analytics</h1>
        </Grid>
      </Slide>
      <Slide direction="up" in={true} timeout={700}>
        <Grid item xs={6}>
          <p className="subtitle">
            We are creating a consolidated data platform that enables UW
            academic and administrative units to efficiently navigate the
            University’s data so they can achieve more with analytics.
          </p>
        </Grid>
      </Slide>
    </Grid>
  );
}

function DescriptionCards() {
  const data = [
    {
      imgSrc: graph,
      title: "Efficient Design",
      desc:
        "Explore University data previously buried in clunky UI with our new streamlined design."
    },
    {
      imgSrc: shop,
      title: "One-Stop Shop",
      desc:
        "Waste no time looking for the right portal with all data aggregated in one place."
    },
    {
      imgSrc: qa,
      title: "Informed Decisions",
      desc:
        "Use our portal to answer questions and make informed decisions supported by data."
    }
  ];

  return (
    <Grid container direction="row">
      {data.map(elem => {
        return <DescriptionCard elem={elem}></DescriptionCard>;
      })}
    </Grid>
  );
}

function DescriptionCard({ elem }) {
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
}

function PersonaCards() {
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
          return <PersonaCard elem={elem}></PersonaCard>;
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

function PersonaCard({ elem }) {
  return (
    <Grid item md={3}>
      <Card className="no-box-shadow gray-background">
        <CardContent>
          <img src={elem.imgSrc} className="circle-image"></img>
          <h3>{elem.name}</h3>
        </CardContent>
      </Card>
    </Grid>
  );
}
