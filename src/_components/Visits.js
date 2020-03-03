import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ErrorMessage, VisitTile, Loading } from "./";
import { VISITLIST_QUERY } from "../Graphql";

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
  const { data, loading, error, fetchMore } = useQuery(VISITLIST_QUERY, {
    pollInterval: 1500
  });
  const classes = useStyles();

  if (loading) return <Loading />;
  if (error) return <ErrorMessage error={error} />;
  if (!data) return <p>No new visits</p>;

  console.log("Data:", data);

  return (
    <div className={classes.container}>
      {data.visits &&
        data.visits.edges &&
        data.visits.edges.map(visit => (
          <VisitTile key={visit.node.id} visit={visit.node} />
        ))}

      {data.visits && data.visits.pageInfo && data.visits.pageInfo.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                after: data.visits.pageInfo.endCursor
              },
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  visits: {
                    ...fetchMoreResult.visits,
                    visits: [
                      ...prev.visits.edges,
                      ...fetchMoreResult.visits.edges
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
      {data.visits && data.visits.pageInfo && data.visits.pageInfo.hasNextPage && (
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                after: data.visits.pageInfo.startCursor
              },
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) return prev;
                return {
                  ...fetchMoreResult,
                  visits: {
                    ...fetchMoreResult.visits,
                    visits: [
                      ...prev.visits.edges,
                      ...fetchMoreResult.visits.edges
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
