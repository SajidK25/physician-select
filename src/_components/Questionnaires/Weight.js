import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBox, RadioOption, Heading, AnythingElse } from "./";
import { HeadingWithText } from "./Display";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 13,
    fontWeight: 500,
  },
  item: {
    fontSize: 11,
    fontWeight: 400,
    marginLeft: theme.spacing(2),
  },
  text: {
    fontSize: 11,
    marginLeft: theme.spacing(4),
  },
  container: {
    flex: 1,
    overflow: "auto",
    padding: "4px 8px",
  },
}));

const Measurements = ({ q }) => {
  const m = q.measurement;
  return (
    <>
      <Heading heading="Personal Info" />
      <HeadingWithText
        heading="Height:"
        text={`${m.feet}' ${m.inches}" ${m.currentWeight}lbs`}
      />
      <HeadingWithText
        heading="Weight:"
        text={`${m.currentWeight}lbs Goal:${m.goalWeight}lbs.`}
      />
      <HeadingWithText
        heading="Heaviest:"
        text={`${m.heaviestWeight}lbs Age:${m.heaviestWeightAge}`}
      />
      <HeadingWithText
        heading="Lowest:"
        text={`${m.lowestWeight}lbs Age:${m.lowestWeightAge}`}
      />
    </>
  );
};

export const WeightQuestionnaire = (props) => {
  const { q } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Measurements q={q} />
    </Paper>
  );
};
