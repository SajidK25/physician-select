import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  progress: {
    width: "100%"
  }
});

//progress: {
//  position: "fixed",

//  top: "50%",
//  left: "50%",
//  zIndex: 1500
//}

export const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <LinearProgress />
    </div>
  );
};
