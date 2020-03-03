import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Mutation } from "@apollo/react-components";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { SelectField, ErrorMessage } from "./";
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

const drugIds = [
  { value: "EROS", label: "EROS" },
  { value: "ROMEO", label: "ROMEO" },
  { value: "TADALAFIL 10", label: "Tadalafil 10mg" },
  { value: "TADALAFIL 20", label: "Tadalafil 20mg" },
  { value: "TADALAFIL_DAILY", label: "Tadalafil Daily 5mg" },
  { value: "SILDENAFIL 20", label: "Sildenafil 20mg" },
  { value: "SILDENAFIL 50", label: "Sildenafil 50mg" },
  { value: "SILDENAFIL 100", label: "Sildenafil 100mg" },
  { value: "MALE_DAILY", label: "Mail Daily" },
  { value: "MALE_DAILY_PLUS", label: "Male Daily + Tadalafil 5mg" }
];

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

export const ChangeEd = props => {
  const classes = useStyles();
  const { visit } = props;
  const subscription = visit.questionnaire.subscription;
  const [open, setOpen] = useState(false);
  const [drugId, setDrugId] = useState(
    subscription.drugId + subscription.doseOption
      ? " " + subscription.doseOption
      : ""
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        className={classes.button}
        color="primary"
        variant="outlined"
        fullWidth={true}
      >
        Change
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Change Treatment Plan</DialogTitle>
        <DialogContent>
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
                initialValues={{ startId: drugId }}
                validate={validate}
                onSubmit={async (values, form) => {
                  console.log("Variable:", values);
                  setOpen(false);
                  //  await login({ variables: { ...values } });
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <ErrorMessage error={error} />
                    <SelectField
                      name="startId"
                      options={drugIds}
                      label="Drug and Dose"
                    />

                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  </form>
                )}
              </Form>
            )}
          </Mutation>
        </DialogContent>
      </Dialog>
    </>
  );
};
