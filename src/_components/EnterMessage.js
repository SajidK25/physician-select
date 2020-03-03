import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import Link from "@material-ui/core/Link";
import { RenderStdTextField, ErrorMessage } from "./";
// import { ME_QUERY, LOGIN_MUTATION } from "../Graphql";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 0
  },
  paper: {
    marginTop: 0
  },
  submit: {
    margin: theme.spacing(1, 0, 2)
  }
}));

const validate = values => {
  const errors = {};
  if (!values.messageText) {
    errors.messageText = "Text is required";
  }

  return errors;
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  //  window.alert(JSON.stringify(values, 0, 2));
};

export const EnterMessage = props => {
  const classes = useStyles();

  //  const history = useHistory();
  // const location = useLocation();
  // const { from } = location.state || { from: { pathname: "/" } };

  //  const [login, { error }] = useMutation(LOGIN_MUTATION);

  return (
    <Form
      initialValues={{ messageText: "" }}
      validate={validate}
      onSubmit={onSubmit}

      //const response = await login({
      //  variables: { ...values },
      //  update: (store, { data }) => {
      //    if (!data) {
      //      return null;
      //    }

      //    store.writeQuery({
      //      query: ME_QUERY,
      //      data: {
      //        me: data.login.user
      //      }
      //    });
      //  }
      //});
      //console.log(response);

      //if (response && response.data) {
      //  setAccessToken(response.data.login.accessToken);
      // }
    >
      {({ handleSubmit, submitting, pristine, reset, invalid }) => (
        <form
          onSubmit={event => {
            handleSubmit(event).then(reset);
          }}
          className={classes.form}
        >
          <Field
            component={RenderStdTextField}
            autoFocus={true}
            required
            multiline={true}
            rows={2}
            rowsMax={3}
            type="text"
            name="messageText"
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={submitting || pristine || invalid}
            className={classes.submit}
          >
            Enter Note
          </Button>
        </form>
      )}
    </Form>
  );
};
