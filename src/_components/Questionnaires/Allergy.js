import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  CheckBox,
  RadioOption,
  Heading,
  HeadingWithText,
  YesNoRadio,
  Item,
  AnythingElse,
} from "./";

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
    // fontWeight: 00,
    color: "red",
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

const addNext = (current, subTitle, next) => {
  if (!next) return "";

  let i = "";
  if (current) {
    i = "   ";
  }
  return i + subTitle + " " + next;
};

const Conditions = (props) => {
  const { title, conditions } = props;
  const classes = useStyles();

  if (!conditions.selected) return null;

  let text = "";
  if (conditions.side) text += addNext("", "Side:", conditions.side);
  if (conditions.frequency)
    text += addNext(text, "Frequency:", conditions.frequency);
  if (conditions.occurs) text += addNext(text, "Occurs:", conditions.occurs);

  if (!text) return null;

  return (
    <Typography className={classes.condition}>
      {title + " - "}
      <span className={classes.item}>{text}</span>
    </Typography>
  );
};

const ShowIssues = (props) => {
  const { title, hasNoIssues, options } = props;

  if (hasNoIssues) return null;

  return (
    <>
      <Heading heading={title} />
      {options.map((o) => (
        <Conditions key={o.title} title={o.title} conditions={o.conditions} />
      ))}
    </>
  );
};

const NoseIssues = (props) => {
  const { q } = props;

  return (
    <ShowIssues
      title="Nose"
      hasNoIssues={q.noseIssues.none}
      options={[
        { title: "Congested", conditions: q.noseCongested },
        { title: "Runny (clear)", conditions: q.noseClearMucus },
        { title: "Runny (colored)", conditions: q.noseColoredMucus },
        { title: "Itchy", conditions: q.noseItchy },
        { title: "Smell/Taste", conditions: q.noseSmell },
        { title: "Snoring", conditions: q.noseSnoring },
        { title: "Sneezing", conditions: q.noseSneezing },
      ]}
    />
  );
};

const EyeIssues = (props) => {
  const { q } = props;

  return (
    <ShowIssues
      title="Eyes"
      hasNoIssues={q.eyeIssues.none}
      options={[
        { title: "Watery", conditions: q.eyeWatery },
        { title: "Itchy", conditions: q.eyeItchy },
        { title: "Red", conditions: q.eyeRed },
        { title: "Swollen", conditions: q.eyeSwollen },
        { title: "Discharge", conditions: q.eyeDischarge },
      ]}
    />
  );
};

const EarIssues = (props) => {
  const { q } = props;

  return (
    <ShowIssues
      title="Ears"
      hasNoIssues={q.earIssues.none}
      options={[
        { title: "Clogged", conditions: q.earClogged },
        { title: "Itchy", conditions: q.earItchy },
        { title: "Ringing", conditions: q.earRinging },
        { title: "Hearing", conditions: q.earHearingLoss },
      ]}
    />
  );
};

const ThroatIssues = (props) => {
  const { q } = props;

  return (
    <ShowIssues
      title="Throat"
      hasNoIssues={q.throatIssues.none}
      options={[
        { title: "Sore", conditions: q.throatSore },
        { title: "Cough", conditions: q.throatCough },
        { title: "Itchy", conditions: q.throatItchy },
        { title: "Clearing", conditions: q.throatClearing },
        { title: "Hoarse", conditions: q.throatHoarse },
        { title: "Post Nasal", conditions: q.throatPostNasal },
      ]}
    />
  );
};

const HeadIssues = (props) => {
  const { q } = props;

  return (
    <ShowIssues
      title="Head"
      hasNoIssues={q.headIssues.none}
      options={[
        { title: "Ache", conditions: q.headAche },
        { title: "Pressure", conditions: q.headPressure },
      ]}
    />
  );
};

const SymptomsBegan = ({ q }) => {
  const choices = {
    heading: "Symptoms Began",
    options: [
      { id: "3mo", label: "Within the last 3 months" },
      { id: "6mo", label: "Within the last 6 months" },
      { id: "12mo", label: "Within the last year" },
      { id: "monthly", label: "More than a year ago" },
    ],
  };

  return <RadioOption answer={q.symptomsBegan.answer} choices={choices} />;
};

const ShowWhen = ({ when, heading, isRed }) => {
  if (when.length === 0) return null;
  const w = when.toString();

  return <HeadingWithText heading={heading} text={w} isRed={isRed} />;
};

const SymptomsWhen = ({ q }) => (
  <>
    <Heading heading="Symptoms When" />
    <ShowWhen when={q.symptomMonths.have} heading="Normal" isRed={false} />
    <ShowWhen when={q.symptomMonths.severe} heading="Severe" isRed={true} />
  </>
);

const InfectionsPerYear = ({ q }) => {
  const choices = {
    heading: "Infections Per Year",
    options: [
      { id: "1", label: "One" },
      { id: "2", label: "Two" },
      { id: "3", label: "Three" },
      { id: "4", label: "Four" },
      { id: "5+", label: "Five or More" },
    ],
  };

  return <RadioOption answer={q.infectionsPerYear.answer} choices={choices} />;
};

const MakeWorse = ({ q }) => (
  <>
    <Heading heading="Makes Symptoms Worse" />
    <ShowWhen heading="Irritants" when={q.makeWorse.irritants} isRed={false} />
    <ShowWhen heading="Medicine" when={q.makeWorse.medicine} isRed={false} />
    <ShowWhen heading="Allergens" when={q.makeWorse.allergens} isRed={false} />
    <ShowWhen heading="Location" when={q.makeWorse.location} isRed={false} />
  </>
);

const HasSmoked = ({ hasSmoked }) => {
  if (!hasSmoked.selected) return null;

  return (
    <>
      <HeadingWithText heading="Smoke packs per day" text={hasSmoked.howMuch} />
      <HeadingWithText heading="Quit smoking?" text={hasSmoked.hasQuit} />
    </>
  );
};

const LifeStyle = ({ q }) => (
  <>
    <Heading heading="Lifestyle" />
    <HasSmoked hasSmoked={q.hasSmoked} />
    <CheckBox answer={q.hasPets.selected} option="Has Pets" />
    <CheckBox answer={q.noPetsOrSmoking} options="None Selected" />
  </>
);

const Dwelling = ({ q }) => {
  const d = q.dwelling;
  const location =
    d.location === "Other" ? "Other: " + d.locationother : d.location;
  const type = d.type === "Other" ? "Other: " + d.typeother : d.type;

  return (
    <>
      <Heading heading="Dwelling" />
      <HeadingWithText heading="Location" text={location} />
      <HeadingWithText heading="Type" text={type} />
    </>
  );
};

const AllergyMeds = ({ q }) => (
  <>
    <Heading heading="Allergy Medications" />

    <CheckBox answer={q.allergyMeds.allegra} option="Allegra" />
    <CheckBox answer={q.allergyMeds.benedryl} option="Benedryl" />
    <CheckBox answer={q.allergyMeds.claritin} option="Claritin" />
    <CheckBox answer={q.allergyMeds.flonase} option="Flonase" />
    <CheckBox answer={q.allergyMeds.phenylephrine} option="Phenylephrine" />
    <CheckBox answer={q.allergyMeds.sudafed} option="Sudafed" />
    <CheckBox answer={q.allergyMeds.zyrtec} option="Zyrtec" />
    <CheckBox answer={q.allergyMeds.other} option="Other" />
    <CheckBox answer={q.allergyMeds.none} option="None" />
  </>
);

const Problems = ({ q }) => (
  <>
    <Heading heading="Prolems and Procedures" />
    <CheckBox answer={q.problems.earInfections} option="Ear infections" />
    <CheckBox answer={q.problems.sinus} option="Sinus infections" />
    <CheckBox answer={q.problems.brokenNose} option="Broken nose" />
    <CheckBox answer={q.problems.earTubes} option="Ear tubes" />
    <CheckBox answer={q.problems.nasalSurgery} option="Nasal surgery" />
    <CheckBox answer={q.problems.nasalPolyps} option="Nasal polyps" />
    <CheckBox answer={q.problems.deviatedSeptum} option="Deviated septum" />
    <CheckBox answer={q.problems.none} option="None" />
  </>
);

const SkinTesting = ({ q }) => (
  <YesNoRadio
    heading="Skin Testing"
    answer={q.skinTesting.answer}
    text={q.skinTesting.explain}
  />
);

const DateRange = ({ range }) => {
  if (!range.from) return null;

  const text = `${range.from} to ${range.to}`;
  return <HeadingWithText heading="When" text={text} />;
};

const AllergyShot = ({ q }) => {
  return (
    <>
      <Heading heading="Allergy Shots" />
      {q.shots.answer === "Yes" && (
        <>
          <Item text="Yes" isRed={false} />
          <DateRange range={q.shots.range1} />
          <DateRange range={q.shots.range2} />
          <DateRange range={q.shots.range3} />
          <HeadingWithText heading="Helpful" text={q.shots.helpful} />
          <HeadingWithText heading="Reactions" text={q.shots.reactions} />
        </>
      )}
      {q.shots.answer !== "Yes" && <Item text="No" isRed={false} />}
    </>
  );
};

const Environment = ({ q }) => (
  <>
    <Heading heading="Environment" />
    <HeadingWithText heading="Heating" text={q.environment.heating} />
    <HeadingWithText
      heading="Air conditioning"
      text={q.environment.airConditioning}
    />
    <HeadingWithText
      heading="Bedroom floor"
      text={q.environment.bedroomFloor}
    />
    <HeadingWithText
      heading="Family room floor"
      text={q.environment.familyRoomFloor}
    />
    <HeadingWithText heading="Mattress type" text={q.environment.mattress} />
    <HeadingWithText heading="Pillow type" text={q.environment.pillow} />
    <HeadingWithText heading="Comforter type" text={q.environment.comforter} />
  </>
);

const Mold = ({ q }) => {
  return (
    <>
      <Heading heading="Mold and Mildew" />
      {q.mold.selected === "Yes" && (
        <>
          <Item text="Yes" isRed={false} />
          <HeadingWithText heading="Type" text={q.mold.problem} />
          <HeadingWithText heading="Where" text={q.mold.where.toString()} />
        </>
      )}
      {q.mold.selected !== "Yes" && <Item text="No" isRed={false} />}
    </>
  );
};

export const AllergyQuestionnaire = (props) => {
  const { q } = props;
  const classes = useStyles();

  console.log("Q:", q);

  return (
    <Paper className={classes.container}>
      <NoseIssues q={q} />
      <EyeIssues q={q} />
      <EarIssues q={q} />
      <ThroatIssues q={q} />
      <HeadIssues q={q} />
      <SymptomsBegan q={q} />
      <SymptomsWhen q={q} />
      <InfectionsPerYear q={q} />
      <MakeWorse q={q} />
      <LifeStyle q={q} />
      <Dwelling q={q} />
      <AllergyMeds q={q} />
      <Problems q={q} />
      <SkinTesting q={q} />
      <AllergyShot q={q} />
      <Environment q={q} />
      <Mold q={q} />
      <AnythingElse q={q} />
    </Paper>
  );
};
