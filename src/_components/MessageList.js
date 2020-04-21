import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage, Loading, MessageListTile } from "./";
import { GET_PATIENT_MESSAGES } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  visitBox: {
    flex: 1,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    width: "100%",
    height: "100%",
    maxWidth: 760,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const sortPrescriptions = (a, b) => {
  console.log("A:", a);
  console.log("B:", b);
  if (a.status === b.status) return 1;

  if (a.status === "ACTIVE") return 1;
  if (b.status === "ACTIVE") return -1;

  if (a.status === "PENDING") return 1;
  if (b.status === "PENDING") return -1;

  return 0;
};

export const MessageList = () => {
  const history = useHistory();
  const [sorting, setSorting] = useState(false);

  const { data, loading, error } = useQuery(GET_PATIENT_MESSAGES, {
    pollInterval: 2000,
    onCompleted: (data) => {
      //      if (data) {
      //        setSorting(true);
      //        data.pendingPrescriptions.sort(sortPrescriptions);
      //        console.log("Sorted:", data.pendingPrescriptions);
      //        setSorting(false);
      //      }
      console.log("On completed", data);
    },
  });
  const classes = useStyles();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (sorting) return <p>Sorting Results</p>;
  if (!data) return <p>No new visits</p>;

  console.log("Data:", data);

  return (
    <div className={classes.container}>
      {data.getPatientMessages.map((m) => (
        <MessageListTile key={m.id} message={m} />
      ))}
    </div>
  );
};
