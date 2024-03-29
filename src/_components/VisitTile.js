import React from "react";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import moment from "moment";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary
  },
  orange: {
    height: 30,
    width: 30,
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 600
  },
  date: {
    marginLeft: "auto",
    alignSelf: "flex-start",
    fontWeight: 400,
    fontSize: 16
  }
}));

export const VisitTile = props => {
  const { prescription } = props;
  const history = useHistory();
  const classes = useStyles();
  const timeDeadline = moment().diff(
    moment(prescription.createdAt).add(1440, "minutes"),
    "minutes"
  );
  return (
    <Paper
      className={classes.paper}
      onClick={() => {
        history.push("/visit/" + prescription.id);
      }}
    >
      {prescription.type === "ED" ? (
        <Avatar className={classes.orange}>ED</Avatar>
      ) : null}
      <Typography className={classes.name}>
        {`${prescription.user.lastName}, ${prescription.user.firstName}`}
      </Typography>
      <Typography
        color={timeDeadline > 0 ? "error" : ""}
        className={classes.date}
      >
        {moment(prescription.createdAt).fromNow()}
      </Typography>
    </Paper>
  );
};
