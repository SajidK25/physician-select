import React from "react";
import { Route, Redirect } from "react-router-dom";
import { User } from "./";

export const PrivateRoute = ({ children, ...rest }) => {
  return (
    <User>
      {({ data }) => {
        const me = data ? data.physician : null;
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
      }}
    </User>
  );
};
