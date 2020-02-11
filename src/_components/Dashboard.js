import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Visits, Messages } from "./";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    minHeight: "100%",
    padding: theme.spacing(1)
  },
  gridItem: {
    overflow: "auto",
    height: "auto"
  },
  container: {
    display: "flex",
    flex: 1
  }
}));

export const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
      <Visits />
      <Messages />
    </>
  );
};
