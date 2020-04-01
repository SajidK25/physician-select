import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { setAccessToken } from "../accessToken";
import { LOGOUT_MUTATION } from "../Graphql";

const useStyles = makeStyles(theme => ({
  logout: {
    textAlign: "center",
    display: "block",
    width: "100%",
    height: 50,
    fontStyle: "normal",
    fontSize: 18,
    color: "rgb(110, 119, 127)",
    padding: "16px 0px",
    background: "rgb(255, 255, 255)",
    cursor: "pointer"
  }
}));

export const Logout = () => {
  const [logout, { client }] = useMutation(LOGOUT_MUTATION);
  const classes = useStyles();

  return (
    <div
      className={classes.logout}
      onClick={async () => {
        await logout();
        setAccessToken("");
        await client.resetStore();
      }}
    >
      Logout
    </div>
  );
};
