import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { useConfirm } from "../Confirmation";
import { ErrorMessage } from "../_components";
import Button from "@material-ui/core/Button";
import { SETNEXTDELIVERYDATE, SENDREMINDERS, REMINDERS_TO_GO, PROCESS_REFILLS, REFILLS_TO_PROCESS } from "../Graphql";

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
    maxWidth: 280,
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
  const [disabled, setDisabled] = useState(false);

  const { data, error: remindersToGoError, loading: loadingReminders, refetch } = useQuery(REMINDERS_TO_GO);
  const { data: refills, error: refillsToProcessError, loading: loadingRefills, refetch: refetchRefills } = useQuery(
    REFILLS_TO_PROCESS
  );

  const [setNextDeliveryDate, { error: setNextError }] = useMutation(SETNEXTDELIVERYDATE);

  const [sendReminders, { error: sendRemindersError }] = useMutation(SENDREMINDERS);

  const [processRefills, { error: processRefillsError }] = useMutation(PROCESS_REFILLS);

  const setNextDelivery = () => {
    confirm({
      description: "Please confirm that you want to run the utility to set the next delivery dates.",
      title: "Set Next Delivery Dates",
    }).then(async () => {
      try {
        setDisabled(true);
        await setNextDeliveryDate();
        alert("Finished");
      } catch (err) {
        console.log(err);
      }
      setDisabled(false);
    });
  };

  const sendOutReminders = () => {
    confirm({
      description: "Please confirm that you want to run the utility to send out reminders.",
      title: "Send out refill reminders",
    }).then(async () => {
      try {
        setDisabled(true);
        const ret = await sendReminders();
        console.log("return", ret);
        refetch();
        alert("Finished");
      } catch (err) {
        console.log(err);
      }
      setDisabled(false);
    });
  };

  const processTheRefills = () => {
    confirm({
      description: "Please confirm that you want to process refill orders.",
      title: "Process Refill Orders",
    }).then(async () => {
      try {
        setDisabled(true);
        const ret = await processRefills();
        console.log("return", ret);
        refetchRefills();
        alert("Finished");
      } catch (err) {
        console.log(err);
      }
      setDisabled(false);
    });
  };

  if (loadingReminders || loadingRefills) return <div>Loading...</div>;

  console.log("Refills", refills);

  return (
    <div className={classes.paper}>
      <ErrorMessage error={setNextError} />
      <ErrorMessage error={sendRemindersError} />
      <ErrorMessage error={remindersToGoError} />
      <ErrorMessage error={processRefillsError} />
      <ErrorMessage error={refillsToProcessError} />
      Admin
      <Button
        disabled={disabled}
        className={classes.button}
        onClick={() => {
          setNextDelivery();
        }}
      >
        Update Next Delivery Dates
      </Button>
      <Button
        disabled={disabled}
        className={classes.button}
        onClick={() => {
          sendOutReminders();
        }}
      >
        Send out Delivery Reminders ({data.remindersToGo.length + 0})
      </Button>
      <Button
        disabled={disabled}
        className={classes.button}
        onClick={() => {
          processTheRefills();
        }}
      >
        Process Refills ({refills.refillsToProcess.length + 0})
      </Button>
    </div>
  );
};
