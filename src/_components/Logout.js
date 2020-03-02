import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import { setAccessToken } from "../accessToken";
import { LOGOUT_MUTATION } from "../Graphql";

export const Logout = () => {
  const history = useHistory();
  const [logout, { client }] = useMutation(LOGOUT_MUTATION);

  return (
    <Button
      onClick={async () => {
        await logout();
        setAccessToken("");
        await client.resetStore();
      }}
      color="inherit"
      align="center"
    >
      Logout
    </Button>
  );
};
