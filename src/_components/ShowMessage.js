import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  messageRow: {
    display: "grid",
    gridTemplateColumns: "80%",
    marginBottom: 10,
    justifyContent: (props) => props.justify,
  },
  messageContent: {
    display: "grid",
    justifyItems: (props) => props.justify,
  },
  messageText: {
    background: (props) => props.color,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: (props) => props.color,
    border: "1px solid #f3f3f3",
    borderRadius: (props) => props.borderRadius,
    padding: "5px 8px",
    fontWeight: 400,
    fontSize: 12,
    lineHeight: "14px",
    textAlign: "left",
  },
  messageTime: {
    fontSize: 9,
    fontWeight: 300,
  },
}));

export const ShowMessage = ({ message }) => {
  const messageStyle = {
    justify: "end",
    color: "#F3F3F3",
    borderRadius: "8px 8px 0 8px",
  };

  if (!message.physician) {
    messageStyle.justify = "start";
    messageStyle.color = "#DDF6FF";
    messageStyle.borderRadius = "8px 8px 8px 0";
  }

  if (message.private) messageStyle.color = "#FFF3DD";

  const classes = useStyles(messageStyle);

  return (
    <div className={classes.messageRow}>
      <div className={classes.messageContent}>
        <div className={classes.messageText}>{message.text}</div>
        <div className={classes.messageTime}>
          {message.private ? `(private) ` : null}{" "}
          {moment(message.createdAt).format("MMMM Do YY, h:mm a")}
        </div>
      </div>
    </div>
  );
};
