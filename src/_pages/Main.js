import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "../_components";
import { PleaseSignIn, Dashboard, VisitDetail } from "../_components";
//import { Review } from "../_pages/Review";
//import { LoginPage, CreateAccountPage } from "../Questionaire/Shared/Pages";
//import { Questionaire } from "../Questionaire";

export const Main = props => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <PleaseSignIn>
            <Dashboard />
          </PleaseSignIn>
        </Route>
        <Route path="/visit/:id">
          <PleaseSignIn>
            <VisitDetail />
          </PleaseSignIn>
        </Route>
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
