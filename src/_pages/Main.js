import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout, SignIn, useMe } from "../_components";
import { Dashboard, VisitDetail } from "../_components";
//import { Review } from "../_pages/Review";
//import { LoginPage, CreateAccountPage } from "../Questionaire/Shared/Pages";
//import { Questionaire } from "../Questionaire";

export const Main = props => {
  const me = useMe();

  return (
    <Layout>
      <Switch>
        <Route path="/login">
          <SignIn />
        </Route>
        {me ? (
          <>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/visit/:id">
              <VisitDetail />
            </Route>
          </>
        ) : (
          <SignIn />
        )}
      </Switch>
    </Layout>
  );
};

// /* <Switch>
//           <Route path="/">
//             <Main />
//           </Route>
//           <Route path="/confirmation">
//             <Review />
//           </Route>
//           <Route path={`/visitStart/:id`}>
//             <CreateAccountPage />
//           </Route>
//           <Route path={`/Login/:id`}>
//             <LoginPage />
//           </Route>
//           <Route path={"/visit/:id"}>
//             <Questionaire />
//           </Route>
//         </Switch> */}
