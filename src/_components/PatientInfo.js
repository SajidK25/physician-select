import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { ShowPhoto, ChangeEd, TreatmentPlan } from "../_components";
import { formatPhoneNumber } from "../_helpers";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
  patientInfo: {
    padding: "4px 8px",
    width: "100%",
    flex: "1 1",
    overflow: "auto",
  },
  treatmentPlan: {
    marginTop: 4,
    width: "100%",
  },
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  name: {
    fontSize: 16,
    fontWeight: 600,
  },
  address: {
    fontSize: 12,
    fontWeight: 500,
  },
  item: {
    fontSize: 14,
    marginLeft: theme.spacing(2),
  },
  conditionHeading: {
    fontWeight: 600,
  },
  bloodPressure: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: 400,
  },
  condition: {
    fontSize: 12,
  },
  text: {
    fontSize: 14,
    marginLeft: theme.spacing(3),
  },
  treatmentHeading: {
    fontSize: 14,
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
    marginTop: theme.spacing(0.5),
    marginBottom: theme.spacing(2),
  },
  age: {
    fontSize: 12,
    fontWeight: 400,
  },
  button: {
    margin: theme.spacing(0.25),
    width: "calc(50% - 4px)",
  },
}));

const ShowBP = ({ q }) => {
  const classes = useStyles();

  if (!q.bloodPressure) return null;

  const bloodPressure = !q.bloodPressure.systolic
    ? "No BP given"
    : `BP: ${q.bloodPressure.systolic || ""}/${q.bloodPressure.diastolic || ""} mmHg`;

  return <Typography className={classes.bloodPressure}>{bloodPressure}</Typography>;
};

const ShowCondition = (props) => {
  const classes = useStyles();
  const { condition, name } = props;

  return (
    <Typography color={condition.explain ? "error" : "inherit"} className={classes.condition}>
      <span className={classes.conditionHeading}>{name}:</span> {condition.explain || "None"}
    </Typography>
  );
};

export const PatientInfo = (props) => {
  const { prescription } = props;
  const classes = useStyles();

  const age = moment().diff(prescription.user.birthDate, "years");

  return (
    <div className={classes.container}>
      <Paper className={classes.patientInfo}>
        <Typography
          className={classes.name}
        >{`${prescription.user.lastName}, ${prescription.user.firstName}`}</Typography>
        <ShowPhoto photoId={prescription.user.photoId} />
        <Typography className={classes.address}>
          {`${prescription.user.addresses[0].city}, ${prescription.user.addresses[0].state} ${prescription.user.addresses[0].zipcode} `}
          <br />
          {formatPhoneNumber(prescription.user.addresses[0].telephone)}
        </Typography>
        <Typography className={classes.age}>
          {`${age} years old`}, {prescription.user.gender === "male" ? `Male` : "Female"}
        </Typography>
        <ShowBP q={prescription.visit.questionnaire} />
        {prescription.visit.questionnaire.allergies && (
          <ShowCondition condition={prescription.visit.questionnaire.allergies} name="Allergies" />
        )}
        {prescription.visit.questionnaire.otherMedicines && (
          <ShowCondition condition={prescription.visit.questionnaire.otherMedicines} name="Medications" />
        )}
        {prescription.visit.questionnaire.medications && (
          <ShowCondition condition={prescription.visit.questionnaire.medications} name="Diet Medications" />
        )}
        {prescription.visit.questionnaire.supplements && (
          <ShowCondition condition={prescription.visit.questionnaire.supplements} name="Diet Supplements" />
        )}
        {prescription.visit.questionnaire.medicationsSupplements && (
          <ShowCondition
            condition={prescription.visit.questionnaire.medicationsSupplements}
            name="Hair Medications/Supplements"
          />
        )}
      </Paper>
      <Paper className={classes.treatmentPlan}>
        <TreatmentPlan prescription={prescription} />
      </Paper>
    </div>
  );
};
