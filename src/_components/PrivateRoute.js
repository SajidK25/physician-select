import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./";

export const PrivateRoute = ({ children, ...rest }) => {
  const ret = useAuth();

  console.log("Auth", ret);

  // if (loading) return <div>Loading...</div>;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        ret.data ? (
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
