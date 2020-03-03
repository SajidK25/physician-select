import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { EnterMessage } from "./";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "auto"
  },
  entry: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    flex: 1,
    maxHeight: 135
  },
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: theme.spacing(1)
  }
}));

export const PatientMessages = props => {
  const { visit } = props;
  const classes = useStyles();
  console.log(visit);

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography>New Messages</Typography>
      </Paper>
      <Paper className={classes.entry}>
        <EnterMessage />
      </Paper>
    </div>
  );
};
