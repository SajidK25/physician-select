import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";

const AppRouter = () => {
  return (
    <div style={style}>
      <Router>
        <Switch>
          <Route path="/" exact></Route> component={ListUserComponent} />
          <Route path="/messages" component={AddUserComponent} />
          <Route path="/edit-user" component={EditUserComponent} />
        </Switch>
      </Router>
    </div>
  );
};

const style = {
  marginTop: "20px"
};

export default AppRouter;
