import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { CheckBox, AnythingElse, Heading, HeadingWithText, HeadingWithOptions, HeadingWithYesNo, YesNoRadio } from "./";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 13,
    fontWeight: 500,
  },
  condition: {
    fontSize: 11,
    marginLeft: 12,
    whiteSpace: "pre-wrap",
  },
  item: {
    fontWeight: 600,
    color: "red",
  },
  image: {
    height: 40,
    width: "auto",
    marginLeft: 15,
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

const Childhood = ({ q }) => (
  <>
    <Heading heading="Childhood Memories" />
    <HeadingWithYesNo heading="Extreme mood changes" value={q.childhood.answer} />
  </>
);

const VitaminD = ({ q }) => (
  <>
    <Heading heading="Vitamin D" />
    <HeadingWithYesNo heading="Levels checked?" value={q.vitaminD.answer} />
    {q.vitaminD.answer === "Yes" && <HeadingWithYesNo heading="Take a supplement?" value={q.vitaminD.supplement} />}
  </>
);

const Treatment = ({ q }) => {
  const diagnosisOptions = [
    "Depression",
    "Spectrum Disorder",
    "Personality Disorder",
    "Bipolar Disorder",
    "Anxiety Disorder",
    "Other",
  ];

  return (
    <>
      <Heading heading="Type of Treatment" />
      <HeadingWithYesNo heading="Saw a physician" value={q.treatment.answer} />
      {q.treatment.answer === "Yes" && <HeadingWithText heading="Diagnosis" text={q.treatment.diagnosis} />}
      {q.treatment.answer === "Yes" && (
        <HeadingWithYesNo heading="Treated with medication?" value={q.treatment.medicationHelpful} />
      )}
      {q.treatment.medicationExplain && q.treatment.medication === "Yes" && (
        <HeadingWithText heading="Type of medication" text={q.treatment.medicationExplain} />
      )}
      {q.treatment.medication === "Yes" && (
        <HeadingWithYesNo heading="Medication Helpful?" value={q.treatment.medicationHelpful} />
      )}
      {q.treatment.answer === "yes" && (
        <>
          <HeadingWithYesNo heading="Treated with therapy" text={q.treatment.therapy} />
          <HeadingWithYesNo heading="Medication Helpful?" value={q.treatment.medicationHelpful} />
        </>
      )}
    </>
  );
};

const HowOften = ({ q }) => {
  const howOftenOptions = ["Not at all", "Just a little", "Somewhat", "Moderately", "Quite a lot", "Very much"];

  return (
    <>
      <Heading heading="Situations (How Often)" />
      <HeadingWithText heading="Feeling down/depressed/hopeless" text={q.howOften.down} />
      <HeadingWithText heading="Trouble concentrating" text={q.howOften.concentrating} />
      <HeadingWithText heading="Lost interest/pleasure" text={q.howOften.pleasure} />
      <HeadingWithText heading="Difficulty making decisions" text={q.howOften.decisions} />
      <HeadingWithText heading="Feeling sad" text={q.howOften.sad} />
      <HeadingWithText heading="Agitated/Restless" text={q.howOften.agitated} />
      <HeadingWithText heading="Feeling fatigued" text={q.howOften.fatigued} />
      <HeadingWithText heading="Takes great effort" text={q.howOften.effort} />
      <HeadingWithText heading="Feel like a failure" text={q.howOften.failure} />
      <HeadingWithText heading="Sleeping problems" text={q.howOften.sleeping} />
      <HeadingWithText heading="Think about suicide" text={q.howOften.kill} />
      <HeadingWithText heading="Feel trapped" text={q.howOften.trapped} />
      <HeadingWithText heading="Depressed even when good things" text={q.howOften.goodThings} />
      <HeadingWithText heading="Lost or gained weight" text={q.howOften.weight} />
      <HeadingWithText heading="Nervous/anxious" text={q.howOften.nervous} />
      <HeadingWithText heading="Easily annoyed" text={q.howOften.annoyed} />
      <HeadingWithText heading="Feel afraid" text={q.howOften.afraid} />
    </>
  );
};

const SocialFactors = ({ q }) => {
  console.log("Social Factors", q.socialFactors);

  return (
    <>
      <Heading heading="Social Factors" />
      <CheckBox answer={q.socialFactors.lgbqt} option="LGBQT" />
      <CheckBox answer={q.socialFactors.alcohol} option="Alcohol/Drug dependency" />
      <CheckBox answer={q.socialFactors.relationship} option="End of relationship" />
      <CheckBox answer={q.socialFactors.financial} option="Financial pressures" />
      <CheckBox answer={q.socialFactors.job} option="Job change" />
      <CheckBox answer={q.socialFactors.divorce} option="Divorce" />
      <CheckBox answer={q.socialFactors.death} option="Death" />
      <CheckBox answer={q.socialFactors.children} option="Children" />
      <CheckBox answer={q.socialFactors.postpartum} option="Postpartum" />
      <CheckBox answer={q.socialFactors.other} option="Other" text={q.socialFactors.otherExplain} />
      {q.socialFactors.none && <CheckBox answer={q.socialFactors.none} option="None" />}
    </>
  );
};

export const JoyQuestionnaire = ({ q }) => {
  const classes = useStyles();
  console.log("Joy Q", q);

  return (
    <Paper className={classes.container}>
      <SocialFactors q={q} />
      <HowOften q={q} />
      <Treatment q={q} />
      <VitaminD q={q} />
      <Childhood q={q} />
      <AnythingElse q={q} />
    </Paper>
  );
};

/*


  childhood: {
    answer
  }, */
