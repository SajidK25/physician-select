import React from "react";
import { useQuery } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import { SignIn } from "./SignIn";

export const PleaseSignIn = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error ${error}`}</p>;
  console.log("Data", data);
  if (!data.physician) {
    return (
      <div>
        <p>Please Sign In before Continuing</p>
        <SignIn />
      </div>
    );
  }
  return props.children;
};

export default PleaseSignIn;
