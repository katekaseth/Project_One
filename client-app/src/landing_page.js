import React from "react";
import "./App.css";

import academics from "./icons/academics.png";
import research from "./icons/research.png";
import university from "./icons/university.png";
import finance from "./icons/finance.png";
import hr from "./icons/hr.png";
import services from "./icons/services.png";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {}
});

function CategoryCards() {
  const classes = useStyles();

  const data = [
    {
      image: academics,
      title: "Academics"
    },
    {
      image: research,
      title: "Research"
    },
    {
      image: university,
      title: "University Advancement"
    },
    {
      image: finance,
      title: "Finance"
    },
    {
      image: hr,
      title: "Human Resources"
    },
    {
      image: services,
      title: "Services & Resources"
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={4}>
        {data.map((elem, index) => {
          return (
            <SingleCategCard
              image={elem.image}
              title={elem.title}
              key={index}></SingleCategCard>
          );
        })}
      </Grid>
    </div>
  );
}

function SingleCategCard(props) {
  const classes = useStyles();
  const cardStyle = {
    display: "inline-block",
    width: "50%",
    height: "110px",
    objectFit: "scale-down",
    justifyContent: "center"
  };

  const h2Style = {
    fontFamily: "Roboto, sans-serif",
    textTransform: "uppercase",
    fontSize: "24px",
    fontWeight: "bold"
  };

  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <CardMedia
              style={cardStyle}
              component="img"
              alt={props.title}
              image={props.image}
              title={props.title}
            />
            <h2 style={h2Style}>{props.title}</h2>
            {/* <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography> */}
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default function LandingPage() {
  return (
    <div>
      <div className="title-header">
        <h1> Business Intelligence Portal</h1>
        <div className="inputWithIcon">
          <input
            type="text"
            placeholder="Hit enter to search..."
            className="search"
            name="search"></input>
          <span className="symbol-search">
            <i className="fa fa-search" aria-hidden="true"></i>
          </span>
        </div>
      </div>

      <CategoryCards></CategoryCards>
      {/* <Cards></Cards> */}
    </div>
  );
}

function Cards() {
  const data = [
    {
      image: academics,
      title: "Academics"
    },
    {
      image: research,
      title: "Research"
    },
    {
      image: university,
      title: "University Advancement"
    },
    {
      image: finance,
      title: "Finance"
    },
    {
      image: hr,
      title: "Human Resources"
    },
    {
      image: services,
      title: "Services & Resources"
    }
  ];

  return (
    <div className="centered">
      <section className="cards">
        {data.map((elem, index) => {
          return (
            <SingleCard
              image={elem.image}
              title={elem.title}
              key={index}></SingleCard>
          );
        })}
      </section>
    </div>
  );
}

function SingleCard(props) {
  return (
    <div className="card">
      <a href="#">
        <img src={props.image} alt="Academics"></img>
        <div className="card-content">
          <h2>{props.title}</h2>
        </div>
      </a>
    </div>
  );
}
