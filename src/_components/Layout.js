import React from "react";
import { Header, Nav } from "../_components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  acctApp: {
    height: "100%",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: "flex",
    flexDirection: "column",
  },
  appContent: {
    backgroundColor: "#FAFAFA",
    flex: 1,
    overflowY: "auto",
    paddingTop: 60,
  },
  appContentInner: {
    padding: "0 4px",
    width: "90%",
    maxWidth: "100%",
    margin: "0 auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  appMain: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    background: "rgb(255,255,255)",
  },
  app: {
    display: "block",
  },
}));

export const Layout = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <Nav />
      <div className={classes.acctApp}>
        <div className={classes.appMain}>
          <div className={classes.appContent}>
            <div className={classes.appContentInner}>{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
