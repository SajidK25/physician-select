import React from "react";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { TypeAvatar } from "./";
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.25),
    color: theme.palette.text.primary,
    cursor: "pointer",
    "&:hover": {
      borderStyle: "solid",
      borderWidth: 0.5,
      borderColor: theme.palette.primary,
    },
  },
  mainContainer: {
    display: "flex",
    flexDirection: "row",
  },
  iconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexBasis: 58,
    [theme.breakpoints.down("sm")]: {
      flexBasis: 30,
      flexDirection: "column",
    },
  },
  avatarItem: {
    flexBasis: 35,
    alignItems: "center",
  },
  nameItem: {
    flexBasis: "calc(25% - 58px)",
    textAlign: "left",
    lineHeight: "17px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      flexBasis: "calc(35% - 30px)",
    },
  },
  dateItem: {
    marginLeft: "auto",
    fontWeight: 400,
    fontSize: 16,
    flexBasis: 125,
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
  },
  textItem: {
    paddingLeft: 8,
    paddingRight: 8,
    flexBasis: "60%",
    lineHeight: "17px",
    textAlign: "left",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "calc(45% - 30px)",
    },
  },
}));

export const MessageListTile = (props) => {
  const { message } = props;
  const history = useHistory();
  const classes = useStyles();
  return (
    <Paper
      className={classes.paper}
      onClick={() => {
        history.push("/visit/" + message.prescription.id);
      }}
    >
      <div className={classes.mainContainer}>
        <div className={classes.avatarItem}>
          <TypeAvatar type={message.prescription.type} />
        </div>
        <div className={classes.nameItem}>{`${message.user.lastName}, ${message.user.firstName}`}</div>
        <div className={classes.textItem}>{message.text}</div>
        <Typography className={classes.dateItem}>
          {formatDistance(new Date(message.createdAt), new Date(), { addSuffix: true })}
        </Typography>
      </div>
    </Paper>
  );
};
