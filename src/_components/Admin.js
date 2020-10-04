import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { useConfirm } from "../Confirmation";
import { ErrorMessage } from "../_components";
import { SETNEXTDELIVERYDATE, SENDREMINDERS } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    height: "100%",
    minHeight: "100%",
    padding: theme.spacing(1),
  },
  button: {
    border: "1px solid black",
    padding: "8px 10px",
    fontWeight: 500,
    cursor: "pointer",
    marginTop: 12,
    maxWidth: 250,
    textAlign: "center",
  },

  gridItem: {
    overflow: "auto",
    height: "auto",
  },
  tabPanel: {
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflow: "auto",
  },
  paper: {
    display: "flex",
    width: "100%",
    height: "calc(99vh - 50px)",
    padding: 4,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 4,
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flex: 1,
  },
}));

export const Admin = () => {
  const classes = useStyles();
  const confirm = useConfirm();

  const [setNextDeliveryDate, { error: setNextError }] = useMutation(SETNEXTDELIVERYDATE);

  const [sendReminders, { error: sendRemindersError }] = useMutation(SENDREMINDERS);

  const setNextDelivery = () => {
    confirm({
      description: "Please confirm that you want to run the utility to set the next delivery dates.",
      title: "Set Next Delivery Dates",
    }).then(async () => {
      try {
        await setNextDeliveryDate();
        alert("Finished");
      } catch (err) {
        console.log(err);
      }
    });
  };

  const sendOutReminders = () => {
    confirm({
      description: "Please confirm that you want to run the utility to send out reminders.",
      title: "Send out refill reminders",
    }).then(async () => {
      try {
        const ret = await sendReminders();
        console.log("return", ret);
        alert("Finished");
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className={classes.paper}>
      <ErrorMessage error={setNextError} />
      <ErrorMessage error={sendRemindersError} />
      Admin
      <div
        className={classes.button}
        onClick={() => {
          setNextDelivery();
        }}
      >
        Update Next Delivery Dates
      </div>
      <div
        className={classes.button}
        onClick={() => {
          sendOutReminders();
        }}
      >
        Send out Delivery Reminders
      </div>
      <div className={classes.button}>Process Refills</div>
    </div>
  );
};
