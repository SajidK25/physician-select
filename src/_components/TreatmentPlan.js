import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { ChangeEd } from "./";
import { useConfirm } from "../Confirmation";
import { APPROVE_PRESCRIPTION, DENY_PRESCRIPTION } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  item: {
    fontSize: 14,
    marginLeft: theme.spacing(2),
  },
  text: {
    fontSize: 14,
    marginLeft: theme.spacing(3),
  },
  treatmentHeading: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: 500,
  },
  treatmentContainer: {
    paddingLeft: theme.spacing(1),
  },
  drugDisplay: {
    fontSize: 13,
    fontWeight: 600,
  },
  drugDoses: {
    fontSize: 13,
    marginTop: -5,
  },
  drugDelivery: {
    fontWeight: 500,
    fontSize: 13,
    marginTop: 0,
    marginBottom: 0,
  },
  button: {
    margin: theme.spacing(0.25),
    width: "calc(50% - 4px)",
  },
}));

const deliveryTitle = [
  "Monthly Delivery",
  "2 Month Delivery",
  "3 Month Delivey",
];

export const TreatmentPlan = ({ prescription }) => {
  const classes = useStyles();
  const history = useHistory();
  const confirm = useConfirm();

  const [approvePrescription] = useMutation(APPROVE_PRESCRIPTION, {
    onCompleted({ data }) {
      history.push("/physician");
    },
  });

  const [denyPrescription] = useMutation(DENY_PRESCRIPTION, {
    onCompleted({ data }) {
      history.push("/physician");
    },
  });

  const onDenied = () => {
    confirm({
      description: "Please confirm that you want to decline this request.",
      title: "Decline Prescription Request",
    }).then(
      async () =>
        await denyPrescription({
          variables: { id: prescription.id },
        })
    );
  };

  const onApproved = () => {
    confirm({
      description: "Please confirm that you want to approve this request.",
      title: "Approve Prescription Request",
    }).then(
      async () =>
        await approvePrescription({
          variables: { id: prescription.id },
        })
    );
  };
  // const displayOptions = drugDisplaySetup(subscription);

  return (
    <Paper className={classes.treatmentPlan}>
      <div className={classes.treatmentHeading}>Treatment Preference</div>
      <Divider />
      <div className={classes.treatmentContainer}>
        <div className={classes.drugDisplay}>
          {prescription.product.display}
        </div>

        <div
          className={classes.drugDoses}
        >{`${prescription.timesPerMonth}x per month`}</div>
        {prescription.addon ? (
          <>
            <div className={classes.drugDisplay}>
              {prescription.addon.display}
            </div>
            <div className={classes.drugDoses}>
              {`${prescription.addonTimesPerMonth}x per month`}
            </div>
          </>
        ) : null}

        <div className={classes.drugDelivery}>
          {deliveryTitle[prescription.shippingInterval - 1]}
        </div>
      </div>
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        onClick={onApproved}
      >
        Approve
      </Button>
      <Button
        className={classes.button}
        color="secondary"
        variant="outlined"
        onClick={onDenied}
      >
        Decline
      </Button>
      <ChangeEd prescription={prescription} />
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        onClick={() => history.push("/physician")}
      >
        Cancel
      </Button>
    </Paper>
  );
};
