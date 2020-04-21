import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { EnterMessage, ShowMessages } from "./";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "auto",
  },
  entry: {
    marginTop: 4,
    width: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
}));

export const PatientMessages = (props) => {
  const { prescription } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <ShowMessages prescriptionId={prescription.id} />
      </Paper>
      <Paper className={classes.entry}>
        <EnterMessage prescriptionId={prescription.id} />
      </Paper>
    </div>
  );
};
