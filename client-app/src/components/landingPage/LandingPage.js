import React from "react";
import { Grid, Card, CardContent, makeStyles } from "@material-ui/core";
import "./LandingPage.css";
import hr_icon from "../../icons/hr.png";
import kateka from "../../images/kateka.png";

import { CapstoneLandingInfo } from "./CapstoneLandingInfo";

const useStyles = makeStyles({
  img: {
    borderRadius: "50%",
    width: "70%",
    height: "70%"
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
      style={{ minHeight: "100vh" }}>
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
      imgSrc: hr_icon,
      title: "Efficient Design",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerepellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente."
    },
    {
      imgSrc: hr_icon,
      title: "One-Stop Shop",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerepellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente."
    },
    {
      imgSrc: hr_icon,
      title: "Informed Decisions",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerepellendus quasi fuga nesciunt dolorum nulla magnam veniam sapiente."
    }
  ];
  return (
    <Grid container direction="row">
      {data.map(elem => {
        return (
          <Grid item xs={4}>
            <Card className="no-round-corner">
              <CardContent>
                <img src={elem.imgSrc}></img>
                <h3>{elem.title}</h3>
                <p>{elem.desc}</p>
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
      imgSrc: kateka,
      name: "Dean"
    },
    {
      imgSrc: kateka,
      name: "Advisor"
    },
    {
      imgSrc: kateka,
      name: "Researcher"
    },
    {
      imgSrc: kateka,
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
        <h2 className="title2">We're making your job easier.</h2>
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
      <Grid item xs={12} className="centerPadding">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Rerepellendus quasi fuga nesciunt dolorum nulla magnam veniam
          sapiente.
        </p>
      </Grid>
    </Grid>
  );
}
