import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center"
  },
  entry: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2)
  },
  container: {
    flex: 1,
    overflow: "auto",
    padding: theme.spacing(1)
  }
}));

export const Messages = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography>New Messages</Typography>
      </Paper>
      <Paper className={classes.entry}>
        <Typography></Typography>
      </Paper>
    </div>
  );
};
