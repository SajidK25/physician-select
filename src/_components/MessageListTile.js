import React from "react";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { TypeAvatar, StatusAvatar } from "./";
import moment from "moment";

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
    flexBasis: "50%",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
    },
  },
  nameItem: {
    flexBasis: "calc(40% - 58px)",
    lineHeight: "17px",
    fontWeight: 500,
    [theme.breakpoints.down("sm")]: {
      flexBasis: "calc(45% - 30px)",
    },
  },
  dateItem: {
    marginLeft: "auto",
    fontWeight: 400,
    fontSize: 16,
    flexBasis: 125,
  },
  productContainer: {
    display: "flex",
    flexDirection: "row",
    flexBasis: "calc(66% - 58px)",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "calc(40% - 30px)",
      flexDirection: "column",
    },
  },
  productItem: {
    flexBasis: "50%",
    [theme.breakpoints.down("sm")]: {
      flexBasis: "100%",
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
        <div className={classes.iconContainer}>
          <div className={classes.avatarItem}>
            <TypeAvatar type={message.prescription.type} />
          </div>
        </div>
        <div className={classes.nameItem}>
          {`${message.user.lastName}, ${message.user.firstName}`}
        </div>
        <div className={classes.textContainer}>
          <div className={classes.productItem}>{message.text}</div>
        </div>
        <div className={classes.dateItem}>
          <Typography>{moment(message.createdAt).fromNow()}</Typography>
        </div>
      </div>
    </Paper>
  );
};
