import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { CURRENT_USER_QUERY } from "./User";

const LOGOUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    logout
  }
`;

export const Logout = () => {
  const history = useHistory();

  const [logout] = useMutation(LOGOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted() {
      console.log("Logout Complete");
      history.push("/");
    }
  });

  return (
    <Button onClick={() => logout()} color="inherit" align="center">
      Logout
    </Button>
  );
};
