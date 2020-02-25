import React from "react";
import { Route, Redirect } from "react-router-dom";
import { User } from "./";

export const PrivateRoute = ({ children, ...rest }) => {
  return (
    <User>
      {({ data }) => {
        const me = data ? data.physician : null;
        return (
          <Route
            {...rest}
            render={() =>
              me ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/"
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
