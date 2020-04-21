import React from "react";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { indigo, green, yellow, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
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

const useAvatarStyles = makeStyles((theme) => ({
  pending: {
    height: 20,
    width: 20,
    fontSize: 12,
    fontWeight: 600,
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  active: {
    height: 20,
    width: 20,
    fontSize: 12,
    fontWeight: 500,
    color: theme.palette.getContrastText(green[800]),
    backgroundColor: green[800],
  },
  denied: {
    height: 20,
    width: 20,
    fontSize: 12,
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  typeAvatar: {
    height: 20,
    width: 20,
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
  },
  ed: {
    color: theme.palette.getContrastText(indigo[900]),
    backgroundColor: indigo[900],
  },
}));

const StatusAvatar = ({ status }) => {
  const classes = useAvatarStyles();
  console.log("Status", status);

  return (
    <div className={classes.statusAvatar}>
      {status === "ACTIVE" && (
        <Avatar variant="square" className={classes.active}>
          A
        </Avatar>
      )}
      {status === "PENDING" && (
        <Avatar variant="square" className={classes.pending}>
          P
        </Avatar>
      )}
      {status === "DENIED" && (
        <Avatar variant="square" className={classes.denied}>
          D
        </Avatar>
      )}
    </div>
  );
};

const colors = [
  { type: "ED", color: "#0000b0" },
  { type: "HAIR", color: "#ff0a0a" },
  { type: "ALLERGY", color: "#00c0c0" },
  { type: "JOY", color: "#ffc500" },
  { type: "SLEEP", color: "#00bb00" },
];

const TypeAvatar = ({ type }) => {
  const classes = useAvatarStyles();
  const text = type.substring(0, 1);
  const item = colors.find((c) => c.type === type);
  const color = item.color;

  return (
    <Avatar style={{ backgroundColor: color }} className={classes.typeAvatar}>
      {text}
    </Avatar>
  );
};

export const PrescriptionListTile = (props) => {
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
      <div className={classes.mainContainer}>
        <div className={classes.iconContainer}>
          <div className={classes.avatarItem}>
            <TypeAvatar type={prescription.type} />
          </div>
          <div className={classes.avatarItem}>
            <StatusAvatar status={prescription.status} />
          </div>
        </div>
        <div className={classes.nameItem}>
          {`${prescription.user.lastName}, ${prescription.user.firstName}`}
        </div>
        <div className={classes.productContainer}>
          <div className={classes.productItem}>
            {prescription.product.display}
          </div>
          <div className={classes.productItem}>
            {prescription.addon ? prescription.addon.display : ""}
          </div>
        </div>
        <div className={classes.dateItem}>
          <Typography color={timeDeadline > 0 ? "error" : "textPrimary"}>
            {moment(prescription.createdAt).fromNow()}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};
