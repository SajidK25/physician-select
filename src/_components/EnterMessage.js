import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Field } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { NEW_MESSAGE } from "../Graphql";
// import Link from "@material-ui/core/Link";
import { RenderStdTextField, ErrorMessage } from "./";
// import { ME_QUERY, LOGIN_MUTATION } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 0,
  },
  paper: {
    marginTop: 0,
  },
  textField: {
    padding: 4,
  },
  button: {
    margin: theme.spacing(0.25),
    width: "calc(50% - 4px)",
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.messageText) {
    errors.messageText = "Text is required";
  }

  return errors;
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const EnterMessage = (props) => {
  const classes = useStyles();
  const [newMessage, { error, loading }] = useMutation(NEW_MESSAGE);
  const { prescriptionId } = props;

  return (
    <Form
      initialValues={{ messageText: "", private: true }}
      validate={validate}
      onSubmit={async (values) => {
        console.log("text Value", values.messageText);
        const response = await newMessage({
          variables: {
            input: {
              prescriptionId: prescriptionId,
              text: values.messageText,
              private: values.private,
            },
          },
        });
        console.log(response);
        values.messageText = "";
      }}
    >
      {({ form, handleSubmit, submitting, pristine, reset, invalid }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Field
            className={classes.textField}
            component={RenderStdTextField}
            autoFocus={true}
            required
            type="text"
            placeholder="Enter message"
            name="messageText"
            fullWidth
          />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={submitting || pristine || invalid}
            className={classes.button}
            onClick={() => {
              form.change("private", false);
            }}
          >
            For Patient
          </Button>
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={submitting || pristine || invalid}
            className={classes.button}
            onClick={() => {
              form.change("private", true);
            }}
          >
            Private
          </Button>
        </form>
      )}
    </Form>
  );
};
