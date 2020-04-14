import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import moment from "moment";
import { ShowPhoto, ChangeEd } from "../_components";
import { APPROVE_PRESCRIPTION, DENY_PRESCRIPTION } from "../Graphql";

// import { formatMoney } from "../_helpers";

const UPDATE_VISIT = gql`
  mutation UpdateVisit($id: String!, $status: String!) {
    updateVisit(id: $id, status: $status) {
      message
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  item: {
    fontSize: 14,
    marginLeft: theme.spacing(2),
  },
  allergyHeading: {
    fontWeight: 400,
  },
  allergy: {},
  text: {
    fontSize: 14,
    marginLeft: theme.spacing(3),
  },
  patientInfo: {
    flex: 1,
  },
  container: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
  treatmentPlan: {
    alignSelf: "flex-end",
    width: "100%",
    padding: theme.spacing(1),
  },
  treatment: {
    fontSize: 18,
    fontWeight: 500,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
  },
  treatmentContainer: {
    paddingLeft: theme.spacing(1),
  },
  drugDisplay: {
    fontSize: 18,
    fontWeight: 400,
    marginTop: 8,
    marginBottom: 0,
  },
  drugDelivery: {
    fontWeight: 500,
    fontSize: 14,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  age: {
    fontSize: 18,
    fontWeight: 400,
  },
  button: {
    margin: theme.spacing(0.25),
  },
}));

const deliveryTitle = [
  "Monthly Delivery",
  "2 Month Delivery",
  "3 Month Delivey",
];

const TreatmentPlan = ({ prescription }) => {
  const classes = useStyles();
  const history = useHistory();
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
  // const displayOptions = drugDisplaySetup(subscription);

  return (
    <Paper className={classes.treatmentPlan}>
      <div className={classes.treatment}>Treatment Preference</div>
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
        fullWidth={true}
        onClick={async () => {
          console.log(prescription);
          await approvePrescription({
            variables: { id: prescription.id },
          });
        }}
      >
        Approve
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        fullWidth={true}
        onClick={async () => {
          console.log("DENIED");
          await denyPrescription({
            variables: { id: prescription.id },
          });
        }}
      >
        Decline
      </Button>
      <ChangeEd prescription={prescription} />
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        fullWidth={true}
        onClick={() => history.push("/physician")}
      >
        Cancel
      </Button>
    </Paper>
  );
};

const ShowBP = ({ q }) => {
  if (!q.bloodPressure.systolic) {
    return <Typography color="error">No BP given</Typography>;
  }

  const bloodPressure = `BP: ${q.bloodPressure.systolic || ""}/${
    q.bloodPressure.diastolic || ""
  } mmHg`;

  return <Typography>{bloodPressure}</Typography>;
};

const UnderConstruction = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <p>Under Construction</p>
    </Paper>
  );
};

export const PatientInfo = (props) => {
  const { prescription } = props;
  const classes = useStyles();
  console.log(prescription);
  const age = moment().diff(prescription.user.birthDate, "years");
  console.log("Age", age);

  return (
    <Paper className={classes.container}>
      <div className={classes.patientInfo}>
        <Typography variant="h4" className={classes.name}>
          {`${prescription.user.lastName}, ${prescription.user.firstName}`}
        </Typography>
        <ShowPhoto photoId={prescription.user.photoId} />
        <Typography variant="h5" className={classes.address}>
          {`${prescription.user.addresses[0].city}, ${prescription.user.addresses[0].state} ${prescription.user.addresses[0].zipcode} `}
        </Typography>
        <Typography variant="h5" className={classes.address}>
          {prescription.user.addresses[0].telephone}
        </Typography>
        <Typography className={classes.age}>{`${age} years old`}</Typography>
        {prescription.type === "ED" && (
          <>
            <ShowBP q={prescription.visit.questionnaire} />
            <Typography
              color={
                prescription.visit.questionnaire.allergies.explain
                  ? "error"
                  : "inherit"
              }
              className={classes.allergy}
            >
              Allergies:{" "}
              {prescription.visit.questionnaire.allergies.explain || "None"}
            </Typography>
            <Typography
              color={
                prescription.visit.questionnaire.otherMedicines.explain
                  ? "error"
                  : ""
              }
              className={classes.allergy}
            >
              Medications:{" "}
              {prescription.visit.questionnaire.otherMedicines.explain ||
                "None"}
            </Typography>
          </>
        )}
      </div>
      <TreatmentPlan prescription={prescription} />
    </Paper>
  );
};
