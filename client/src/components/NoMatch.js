import React from 'react';
import { Link, } from "react-router-dom";
import { Button, Header, } from "semantic-ui-react";

const NoMatch = () => (
  <div style={styles.container}>
    <Header as="h1" style={styles.header}>Page Not Found</Header>
    <Link to="/">
      <Button color="black">Home</Button>
    </Link>
  </div>
)

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  header: {
    fontSize: "50px",
  },
};

export default NoMatch;