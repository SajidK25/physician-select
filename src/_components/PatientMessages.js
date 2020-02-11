import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 16,
    fontWeight: 500
  },
  item: {
    fontSize: 14,
    marginLeft: theme.spacing(2)
  },
  text: {
    fontSize: 14,
    marginLeft: theme.spacing(3)
  },
  container: {
    flex: 1,
    overflow: "auto",
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  idImage: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    width: "50%"
  }
}));

export const PatientMessages = props => {
  const { visit } = props;
  const classes = useStyles();
  console.log(visit);

  return (
    <Paper className={classes.container}>
      <Typography variant="h4">Private Messages</Typography>
    </Paper>
  );
};
