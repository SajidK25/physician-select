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
import { drugDisplaySetup } from "../_helpers";
// import { formatMoney } from "../_helpers";

const UPDATE_VISIT = gql`
  mutation UpdateVisit($id: String!, $status: String!) {
    updateVisit(id: $id, status: $status) {
      message
    }
  }
`;

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: 16,
    fontWeight: 500
  },
  item: {
    fontSize: 14,
    marginLeft: theme.spacing(2)
  },
  allergyHeading: {
    fontWeight: 400
  },
  allergy: {},
  text: {
    fontSize: 14,
    marginLeft: theme.spacing(3)
  },
  patientInfo: {
    flex: 1
  },
  container: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  treatmentPlan: {
    alignSelf: "flex-end",
    width: "100%",
    padding: theme.spacing(1)
  },
  treatment: {
    fontSize: 18,
    fontWeight: 500,
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1)
  },
  treatmentContainer: {
    paddingLeft: theme.spacing(1)
  },
  drugDisplay: {
    fontSize: 18,
    fontWeight: 400,
    marginTop: 8,
    marginBottom: 0
  },
  drugDelivery: {
    fontWeight: 500,
    fontSize: 14,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  },
  idImage: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(1),
    width: "50%"
  },
  age: {
    fontSize: 18,
    fontWeight: 400
  },
  button: {
    margin: theme.spacing(0.25)
  }
}));

const TreatmentPlan = ({ visit }) => {
  const classes = useStyles();
  const history = useHistory();
  const subscription = visit.questionnaire.subscription;
  const [updateVisit] = useMutation(UPDATE_VISIT, {
    onCompleted({ data }) {
      history.push("/");
    }
  });

  const displayOptions = drugDisplaySetup(subscription);
  console.log("displayOptions:", displayOptions);

  return (
    <Paper className={classes.treatmentPlan}>
      <div className={classes.treatment}>Treatment Preference</div>
      <Divider />
      <div className={classes.treatmentContainer}>
        <div className={classes.drugDisplay}>{displayOptions.display}</div>

        <div
          className={classes.drugDoses}
        >{`${displayOptions.monthlyDoses}x per month`}</div>
        {displayOptions.addOnDisplay ? (
          <>
            <div className={classes.drugDisplay}>
              {displayOptions.addOnDisplay}
            </div>
            <div className={classes.drugDoses}>
              {`${displayOptions.addOnMonthlyDoses}x per month`}
            </div>
          </>
        ) : null}

        <div className={classes.drugDelivery}>{displayOptions.title}</div>
      </div>
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        fullWidth={true}
        onClick={async () => {
          await updateVisit({
            variables: { id: visit.id, status: "APPROVED" }
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
          await updateVisit({
            variables: { id: visit.id, status: "DENIED" }
          });
        }}
      >
        Decline
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        fullWidth={true}
      >
        Change
      </Button>
      <Button
        className={classes.button}
        color="primary"
        variant="outlined"
        fullWidth={true}
        onClick={() => history.push("/")}
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

  const bloodPressure = `BP: ${q.bloodPressure.systolic || ""}/${q.bloodPressure
    .diastolic || ""} mmHg`;

  return <Typography>{bloodPressure}</Typography>;
};

export const PatientInfo = props => {
  const { visit } = props;
  const classes = useStyles();
  console.log(visit);
  const age = moment().diff(visit.user.birthDate, "years");
  console.log("Age", age);

  return (
    <Paper className={classes.container}>
      <div className={classes.patientInfo}>
        <Typography variant="h4" className={classes.name}>
          {`${visit.user.lastName}, ${visit.user.firstName}`}
        </Typography>
        <Typography variant="h5" className={classes.address}>
          {`${visit.user.addresses[0].city}, ${visit.user.addresses[0].state}`}
        </Typography>
        <Typography variant="h5" className={classes.address}>
          {visit.user.addresses[0].telephone}
        </Typography>
        <Typography className={classes.age}>{`${age} years old`}</Typography>
        <ShowBP q={visit.questionnaire} />
        <Typography
          color={visit.questionnaire.allergies.explain ? "error" : ""}
          className={classes.allergy}
        >
          Allergies: {visit.questionnaire.allergies.explain || "None"}
        </Typography>
        <Typography
          color={visit.questionnaire.otherMedicines.explain ? "error" : ""}
          className={classes.allergy}
        >
          Medications: {visit.questionnaire.otherMedicines.explain || "None"}
        </Typography>
      </div>
      <TreatmentPlan visit={visit} />
    </Paper>
  );
};
