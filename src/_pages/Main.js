import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout, Login, PrivateRoute } from "../_components";
import { VisitDetail, Pharmacy, Physician } from "../_components";
import { Home } from "./";

export const Main = props => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <PrivateRoute path="/pharmacy">
          <Pharmacy />
        </PrivateRoute>
        <PrivateRoute path="/physician">
          <Physician />
        </PrivateRoute>
        <PrivateRoute path="/visit/:id">
          <VisitDetail />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Layout>
  );
};
