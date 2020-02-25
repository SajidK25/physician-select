import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const CURRENT_USER_QUERY = gql`
  query {
    physician {
      id
      email
      firstName
      lastName
    }
  }
`;

export const PrivateRoute = ({ children, ...rest }) => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <div>Loading...</div>;
  console.log("Routing:", data);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        data ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
