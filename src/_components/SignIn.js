import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Mutation } from "@apollo/react-components";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { RenderStdTextField, ErrorMessage } from "./";
import { CURRENT_USER_QUERY } from "./User";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      firstName
    }
  }
`;

const validate = values => {
  const errors = {};
  if (!values.password) {
    errors.password = "Password is required";
  }

  if (!values.email) {
    errors.email = "email address is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

export const SignIn = props => {
  const classes = useStyles();

  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      onCompleted={() => {
        console.log("Complete");
        // history.push({ to });
      }}
      onError={error => {
        console.log(error);
      }}
    >
      {(login, { error, loading }) => (
        <Form
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={async (values, form) => {
            await login({ variables: { ...values } });
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <ErrorMessage error={error} />
              <Field
                component={RenderStdTextField}
                autoFocus={true}
                required
                id="email"
                type="email"
                name="email"
                label="email"
                fullWidth
                autoComplete="email"
              />
              <Field
                component={RenderStdTextField}
                required
                id="state"
                type="password"
                name="password"
                label="Password"
                autoComplete="password"
                fullWidth
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        </Form>
      )}
    </Mutation>
  );
};
