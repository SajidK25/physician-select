import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Logout, User } from "./";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
});

export const Header = () => {
  const classes = useStyles();

  return (
    <User>
      {({ data }) => {
        const me = data ? data.physician : null;
        console.log("ME", data);
        return (
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Physician Dashboard
              </Typography>
              {me && <Logout />}
            </Toolbar>
          </AppBar>
        );
      }}
    </User>
  );
};
