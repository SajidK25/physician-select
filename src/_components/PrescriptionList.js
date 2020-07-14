import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { deepOrange } from "@material-ui/core/colors";
import { ErrorMessage, Loading, PrescriptionListTile } from "./";
import { PENDING_PRESCRIPTIONS } from "../Graphql";

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
    marginLeft: "auto",
    marginRight: "auto",
  },
  orange: {
    height: 30,
    width: 30,
    fontSize: 14,
    fontWeight: 600,
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const sortPrescriptions = (a, b) => {
  if (a.status === b.status) return 1;

  if (a.status === "ACTIVE") return 1;
  if (b.status === "ACTIVE") return -1;

  if (a.status === "PENDING") return 1;
  if (b.status === "PENDING") return -1;

  return 0;
};

export const PrescriptionList = ({ status }) => {
  const history = useHistory();
  const [sorting, setSorting] = useState(false);

  const { data, loading, error } = useQuery(PENDING_PRESCRIPTIONS, {
    variables: { status },
    pollInterval: 2000,
    onCompleted: (data) => {
      if (data) {
        setSorting(true);
        data.pendingPrescriptions.sort(sortPrescriptions);
        setSorting(false);
      }
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

  console.log("Data:", data);

  return (
    <div className={classes.container}>
      {data.pendingPrescriptions.map(
        (p) =>
          p.type !== "SUPPLEMENT" && (
            <PrescriptionListTile
              key={p.id}
              prescription={p}
              onClick={handleClick}
            />
          )
      )}
    </div>
  );
};
