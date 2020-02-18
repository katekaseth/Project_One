import React from "react";
import { Grid, Card, CardContent, CardMedia } from "@material-ui/core";

import akoly from "../../images/akoly.png";
import amelia from "../../images/amelia.png";
import katie from "../../images/katie.png";
import kateka from "../../images/kateka.png";
import filteredSearch from "../../images/filteredSearch.png";
import reportView from "../../images/reportView.png";

export function CapstoneLandingInfo() {
  return (
    <Grid
      alignItems="center"
      jusify="center"
      direction="column"
      spacing={10}
      container>
      {/* <Grid item xs={8}>
        <GoalStatement />
      </Grid> */}
      <Grid item style={{ marginTop: "50px" }}>
        <Section1 />
      </Grid>
      <Grid item>
        <Section2 />
      </Grid>
      <TeamMembers />
    </Grid>
  );
}

function GoalStatement() {
  return (
    <div className="goal-statement">
      <h2 className="title2">
        We are creating a consolidated data platform that enables UW academic
        and administrative units to efficiently and easily navigate the
        University’s data so they can achieve more with analytics.
      </h2>
    </div>
  );
}

function TeamMembers() {
  return (
    <Grid>
      <h2 className="encode-sans">Team Members</h2>
      <Grid container spacing={2}>
        <TeamMember
          name="Akoly Vongdala"
          position="Project Manager, Designer"
          contact="akolyv@uw.edu"
          image={akoly}
        />
        <TeamMember
          name="Amelia Shull"
          position="Designer, Developer"
          contact="ashull@uw.edu"
          image={amelia}
        />
        <TeamMember
          name="Katie Clark"
          position="Developer, Data Science"
          contact="ktc29@uw.edu"
          image={katie}
        />
        <TeamMember
          name="Kateka Seth"
          position="Developer, Data Science"
          contact="kateks@uw.edu"
          image={kateka}
        />
      </Grid>
    </Grid>
  );
}

function TeamMember({ name, position, contact, image }) {
  return (
    <Card className="encode-sans team-member-card">
      <CardMedia component="img" image={image} />
      <CardContent>
        <h3>{name}</h3>
        <p>{position}</p>
        <p>{contact}</p>
      </CardContent>
    </Card>
  );
}

function Section1() {
  return (
    <Grid container alignItems="center" direction="row">
      <Grid xs item className="encode-sans">
        <h3>Filtered Search Report</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Grid>
      <Grid xs item>
        <img className="screenshot-img" src={filteredSearch} />
      </Grid>
    </Grid>
  );
}

function Section2() {
  return (
    <Grid container alignItems="center" direction="row">
      <Grid xs item>
        <img className="screenshot-img" src={reportView} />
      </Grid>
      <Grid xs item className="encode-sans">
        <h3>Clear Report Metadata</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Grid>
    </Grid>
  );
}
