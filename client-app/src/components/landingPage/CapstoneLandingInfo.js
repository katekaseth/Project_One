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
    <div>
      <Grid
        alignItems="center"
        jusify="center"
        direction="column"
        spacing={10}
        container>
        <Grid item style={{ marginTop: "50px" }}>
          <Section1 />
        </Grid>
        <Grid item>
          <Section2 />
        </Grid>
      </Grid>

      <div
        className="gray-background"
        style={{ paddingTop: "25px", marginTop: "25px" }}>
        <h2 className="encode-sans">Team Members</h2>
        <TeamMembers />
      </div>
    </div>
  );
}

function TeamMembers() {
  return (
    <Grid
      jusify="center"
      direction="row"
      className="centerPadding"
      style={{ textAlign: "left" }}
      container>
      <TeamMember
        name="Akoly Vongdala"
        position="Manager, Designer"
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
        position="Developer"
        contact="ktc29@uw.edu"
        image={katie}
      />
      <TeamMember
        name="Kateka Seth"
        position="Developer"
        contact="kateks@uw.edu"
        image={kateka}
      />
    </Grid>
  );
}

function TeamMember({ name, position, contact, image }) {
  return (
    <Grid xs={12} md={3} item spacing={3}>
      <Card className="encode-sans no-box-shadow team-member-card no-round-corner">
        <CardMedia component="img" image={image}></CardMedia>
        <CardContent>
          <p className="name">{name}</p>
          <p>{position}</p>
          <p>{contact}</p>
        </CardContent>
      </Card>
    </Grid>
  );
}

function Section1() {
  return (
    <Grid container alignItems="center" direction="row">
      <Grid xs item className="encode-sans">
        <h3>Find what you need faster.</h3>
        <p>
          We’ve completely redone tagging and filtering so you can quickly find
          what you need.
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
        <h3>Learn more about your data.</h3>
        <p>
          We provide consistent metadata for all reports, vizulations, and
          cubes. It is easy to find and use for all users.
        </p>
      </Grid>
    </Grid>
  );
}
