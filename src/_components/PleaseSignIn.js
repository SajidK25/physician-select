import React from "react";
import { useQuery } from "react-apollo";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { CURRENT_USER_QUERY } from "./User";
import { SignIn } from "./SignIn";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    alignItems: "center"
  }
}));

export const PleaseSignIn = props => {
  const { loading, error, data } = useQuery(CURRENT_USER_QUERY);
  const classes = useStyles();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{`Error ${error}`}</p>;
  console.log("Data", data);
  if (!data.physician) {
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <SignIn />
        </div>
      </Container>
    );
  }
  return props.children;
};

export default PleaseSignIn;
