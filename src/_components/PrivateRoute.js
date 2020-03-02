import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "../Graphql";

export const PrivateRoute = ({ children, ...rest }) => {
  const { data } = useQuery(ME_QUERY);

  const me = data ? data.me : null;
  console.log("ME:", me);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        me ? (
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
