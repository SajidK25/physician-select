import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { RenderStdTextField, ErrorMessage, Spinner } from "./";
import { setAccessToken } from "../accessToken";
import { ME_QUERY, LOGIN_MUTATION } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validate = (values) => {
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

export const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const [login, { error }] = useMutation(LOGIN_MUTATION);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Form
          initialValues={{ email: "", password: "" }}
          validate={validate}
          onSubmit={async (values, form) => {
            try {
              const response = await login({
                variables: { ...values },
                update: (store, { data }) => {
                  if (!data) {
                    return null;
                  }

                  store.writeQuery({
                    query: ME_QUERY,
                    data: {
                      me: data.login.user,
                    },
                  });
                },
              });

              if (response && response.data) {
                setAccessToken(response.data.login.accessToken);
              }

              history.push(from);
            } catch (err) {
              console.log("Error", err);
            }
          }}
        >
          {({ handleSubmit, validating, submitting }) => (
            <form onSubmit={handleSubmit}>
              {(validating || submitting) && <Spinner />}
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
                disabled={validating || submitting}
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
      </div>
    </Container>
  );
};
