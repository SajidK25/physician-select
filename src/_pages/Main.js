import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout, SignIn, PrivateRoute } from "../_components";
import { Dashboard, VisitDetail } from "../_components";

export const Main = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute exact path="/">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/visit/:id">
          <VisitDetail />
        </PrivateRoute>
        <Route path="/login">
          <SignIn />
        </Route>
      </Switch>
    </Layout>
  );
};
