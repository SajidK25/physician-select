import React from "react";
import { Header } from "../_components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  appContainer: {
    display: "flex",
    overflow: "hidden",
    height: "100vh",
    marginTop: -70,
    paddingTop: 70,
    willChange: "overflow",
    backfaceVisibility: "hidden"
  },
  app: {
    height: "100vh",
    display: "flex"
  }
});

export const Layout = props => {
  const classes = useStyles();

  return (
    <div>
      <Header {...props} />
      <div className={classes.appContainer}>{props.children}</div>
    </div>
  );
};
