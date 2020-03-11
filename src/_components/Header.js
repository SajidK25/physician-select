import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Logout } from "./";
import { ME_QUERY } from "../Graphql";

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
  const { data } = useQuery(ME_QUERY);

  const me = data ? data.me : null;
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Victory Select Dashboard
        </Typography>
        <Link to="/prescriptions">Prescriptions</Link>
        {me && <Logout />}
      </Toolbar>
    </AppBar>
  );
};
