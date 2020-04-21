import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 20,
    width: 20,
    fontSize: 12,
    fontWeight: 600,
    color: "#fff",
  },
}));

const statusColors = [
  { status: "ACTIVE", color: "#04A304" },
  { status: "DENIED", color: "#FF0000" },
  { status: "PENDING", color: "#DEDE00" },
];

export const StatusAvatar = ({ status }) => {
  const classes = useStyles();
  console.log("Status", status);

  const item = statusColors.find((c) => c.status === status);
  const color = item.color;
  const text = status.substring(0, 1);

  return (
    <Avatar style={{ backgroundColor: color }} className={classes.avatar}>
      {text}
    </Avatar>
  );
};

const typeColors = [
  { type: "ED", color: "#0000b0" },
  { type: "HAIR", color: "#ff0a0a" },
  { type: "ALLERGY", color: "#00c0c0" },
  { type: "JOY", color: "#ffc500" },
  { type: "SLEEP", color: "#00bb00" },
];

export const TypeAvatar = ({ type }) => {
  const classes = useStyles();
  const text = type.substring(0, 1);
  const item = typeColors.find((c) => c.type === type);
  const color = item.color;

  return (
    <Avatar style={{ backgroundColor: color }} className={classes.avatar}>
      {text}
    </Avatar>
  );
};
