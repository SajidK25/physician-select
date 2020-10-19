import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorMessage, Loading, ShowMessage } from "./";
import { GET_MESSAGES } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  visitBox: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
}));

export const ShowMessages = ({ prescriptionId }) => {
  const history = useHistory();
  const [sorting, setSorting] = useState(false);

  const { data, loading, error } = useQuery(GET_MESSAGES, {
    variables: { prescriptionId: prescriptionId },
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

  const handleClick = (id) => {
    history.push("/visit/" + id);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (sorting) return <p>Sorting Results</p>;
  if (!data) return <p>No new visits</p>;

  return (
    <div className={classes.container}>
      {data.getMessagesByPrescription.map((m) => (
        <ShowMessage key={m.id} message={m} onClick={handleClick} />
      ))}
    </div>
  );
};
