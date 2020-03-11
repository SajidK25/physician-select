import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ErrorMessage, VisitTile, Loading } from "./";
import { PRESCRIPTIONLIST_QUERY } from "../Graphql";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  visitBox: {
    flex: 1
  },
  container: {
    flex: 1,
    overflow: "auto",
    padding: theme.spacing(1)
  }
}));

export const Visits = () => {
  const { data, loading, error, fetchMore } = useQuery(PRESCRIPTIONLIST_QUERY, {
    pollInterval: 1500
  });
  const classes = useStyles();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>No new visits</p>;

  console.log("Data:", data);

  return (
    <div className={classes.container}>
      {data.prescriptions &&
        data.prescriptions.edges &&
        data.prescriptions.edges.map(prescription => (
          <VisitTile
            key={prescription.node.id}
            prescription={prescription.node}
          />
        ))}

      {data.prescriptions &&
        data.prescriptions.pageInfo &&
        data.prescriptions.pageInfo.hasNextPage && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.prescriptions.pageInfo.endCursor
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    prescriptions: {
                      ...fetchMoreResult.visits,
                      prescriptions: [
                        ...prev.prescriptions.edges,
                        ...fetchMoreResult.prescriptions.edges
                      ]
                    }
                  };
                }
              })
            }
          >
            Load More
          </Button>
        )}
      {data.prescriptions &&
        data.prescriptions.pageInfo &&
        data.prescriptions.pageInfo.hasNextPage && (
          <Button
            onClick={() =>
              fetchMore({
                variables: {
                  after: data.prescriptions.pageInfo.startCursor
                },
                updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                  if (!fetchMoreResult) return prev;
                  return {
                    ...fetchMoreResult,
                    prescriptions: {
                      ...fetchMoreResult.prescriptions,
                      prescriptions: [
                        ...prev.visits.edges,
                        ...fetchMoreResult.prescriptions.edges
                      ]
                    }
                  };
                }
              })
            }
          >
            Load More
          </Button>
        )}
    </div>
  );
};
