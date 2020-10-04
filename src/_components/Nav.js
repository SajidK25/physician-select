import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ME_QUERY } from "../Graphql";
import { Logout } from "./";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    height: 40,
    width: "100%",
    top: 0,

    backgroundColor: "rgb(255,255,255)",
    position: "absolute",
    zIndex: 2100,
  },
  active: {
    borderBottomStyle: "solid",
    borderBottomWidth: 4,
    borderBottomColor: theme.palette.primary.main,
    color: "#2196f3 !important",
  },
  link: {
    textAlign: "center",
    display: "block",
    width: "100%",
    height: 40,
    fontStyle: "normal",
    fontSize: 17,
    color: "rgb(110, 119, 127)",
    padding: "10px 0px",
    background: "rgb(255, 255, 255)",
    textDecoration: "none",
  },
  list: {
    justifyContent: "center",
    display: "flex",
    maxWidth: "65%",
    margin: "0px auto",
    listStyleType: "none",
    padding: 0,
    overflow: "hidden",
  },
  item: {
    margin: 0,
    width: "100%",
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuItem = ({ to, label }) => {
  const classes = useStyles();
  return (
    <li className={classes.item}>
      <NavLink to={to} className={classes.link} activeClassName={classes.active}>
        {label}
      </NavLink>
    </li>
  );
};

const LogoutItem = () => {
  const classes = useStyles();
  return (
    <li className={classes.item}>
      <Logout />
    </li>
  );
};

export const Nav = () => {
  const classes = useStyles();
  const { data } = useQuery(ME_QUERY);

  const me = data ? data.me : null;

  return (
    <div className={classes.navBar}>
      <ul className={classes.list}>
        <MenuItem to="/pharmacy" label="Pharmacy" />
        <MenuItem to="/physician" label="Physician" />
        <MenuItem to="/admin" label="Admin" />
        {me && <LogoutItem />}
      </ul>
    </div>
  );
};
