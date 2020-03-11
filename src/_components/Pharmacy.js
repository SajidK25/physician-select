import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Prescriptions } from "./";

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
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    alignItems: "center"
  },
  container: {
    display: "flex",
    flex: 1
  }
}));

export const Pharmacy = () => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Prescriptions />
    </div>
  );
};
