import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { VisitTile, Loading } from "./";

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

const GET_VISITS = gql`
  query visitList($after: String) {
    visits(after: $after) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
      }
      edges {
        node {
          id
          status
          type
          createdAt
          user {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const Visits = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_VISITS, {
    pollInterval: 500
  });
  const classes = useStyles();

  if (loading) return <Loading />;
  if (error) return <p>ERROR!</p>;
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
