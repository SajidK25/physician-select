import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { CheckBox, YesNoRadio, RadioOption, Heading, AnythingElse } from "./";
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

const Reasons = ({ q }) => {
  return <YesNoRadio heading="Reason Can't Exercise?" answer={q.exercise.reason} text={q.exercise.reasonExplain} />;
};

const Exercise = ({ q }) => {
  return (
    <>
      <Heading heading="Exercise" />
      <HeadingWithText heading="Activity Level" text={q.exercise.level} />
    </>
  );
};

const Diet = ({ q }) => {
  return (
    <>
      <Heading heading="Diet" />
      <HeadingWithText heading="Rating (1-5)" text={q.diet.rating} />
      <HeadingWithText heading="Alcohol" text={`${q.diet.alcoholCount} per ${q.diet.alcoholInterval}`} />
      <HeadingWithText heading="Food craving" text={q.diet.crave} />
    </>
  );
};

const PlanExplain = ({ q }) => {
  if (q.plans.notWork === "") return null;

  return (
    <>
      <Heading heading="Plan Details" />
      <HeadingWithText heading="Maintain for one year?" text={q.plans.oneYear} />
      <HeadingWithText heading="What didn't work" text={q.plans.notWork} />
    </>
  );
};

const OtherPlans = ({ q }) => {
  return (
    <>
      <Heading heading="Other Weight Loss Plans" />
      <CheckBox answer={q.plans.weightwatchers} option="Weight Watchers" text={q.plans.weightwatchersExplain} />
      <CheckBox answer={q.plans.jennycraig} option="Jenny Craig" text={q.plans.jennycraigExplain} />
      <CheckBox answer={q.plans.slimfast} option="Slimfast" text={q.plans.slimfastExplain} />
      <CheckBox answer={q.plans.atkins} option="Atkins" text={q.plans.atkinsExplain} />
      <CheckBox answer={q.plans.ornish} option="Ornish" text={q.plans.ornishExplain} />
      <CheckBox answer={q.plans.southbeach} option="South Beach" text={q.plans.southbeachExplain} />
      <CheckBox answer={q.plans.laweightloss} option="LA Weight Loss" text={q.plans.laweightlossExplain} />
      <CheckBox answer={q.plans.nutrisystems} option="Nutrisystems" text={q.plans.nutrisystemsExplain} />
      <CheckBox answer={q.plans.lindora} option="Lindora" text={q.plans.lindoraExplain} />
      <CheckBox
        answer={q.plans.overeatersanonymous}
        option="Over Eaters Anonymous"
        text={q.plans.overeatersanonymousExplain}
      />
      <CheckBox answer={q.plans.liquiddiets} option="Liquid Diets" text={q.plans.liquiddietsExplain} />
      <CheckBox answer={q.plans.meridial} option="Diet Pills: Meridia" text={q.plans.meridialExplain} />
      <CheckBox answer={q.plans.phenfen} option="Diet Pills: Phen-Fen" text={q.plans.phenfenExplain} />
      <CheckBox answer={q.plans.otcdietpills} option="OTC Diet Pills" text={q.plans.otcdietpillsExplain} />
      <CheckBox answer={q.plans.surgery} option="Surgery" text={q.plans.surgeryExplain} />
      <CheckBox answer={q.plans.other} option="Other" text={q.plans.otherExplain} />
      <CheckBox answer={q.plans.none} option="None" />
    </>
  );
};

const Describes = ({ q }) => {
  const choices = {
    heading: "Self Describe",
    options: [
      { id: "always", label: "Calm and easygoing" },
      { id: "sometimes", label: "Sometimes calm" },
      { id: "seldom", label: "Seldom calm" },
      { id: "never", label: "Overwhelming ambition" },
      { id: "driver", label: "Hard driving, never relax" },
    ],
  };

  return <RadioOption answer={q.describes.answer} choices={choices} />;
};

const Mental = ({ q }) => {
  let mList = "";
  if (q.mental.manage.length > 0) {
    mList = q.mental.manage.toString();
  }

  return (
    <>
      <Heading heading="Mental State" />
      <HeadingWithText heading="Feeling down?" text={q.mental.depressed} />
      <HeadingWithText heading="Stress Level" text={q.mental.stress} />
      <HeadingWithText heading="Manage By" text={mList} />
    </>
  );
};

export const Smoking = ({ q }) => {
  return <YesNoRadio heading="Smoking" answer={q.smoke.answer} text={q.smoke.explain} />;
};

const Caffeinated = ({ q }) => {
  const choices = {
    heading: "Caffeinated Beverages",
    options: [
      { id: "None", label: "None" },
      { id: "1-3", label: "One to three" },
      { id: "4-6", label: "Four to six" },
      { id: "6+", label: "More than six" },
    ],
  };
  return <RadioOption answer={q.caffeinated.answer} choices={choices} />;
};

const Scale = ({ q }) => {
  return (
    <>
      <Heading heading="Scale 1-5" />
      <HeadingWithText heading="Achieve goal" text={q.scale.important} isRed={parseInt(q.scale.sabotage) < 3} />
      <HeadingWithText heading="Hard to make changes" text={q.scale.changes} isRed={parseInt(q.scale.sabotage) > 3} />
      <HeadingWithText heading="How much support" text={q.scale.support} isRed={parseInt(q.scale.sabotage) < 3} />
      <HeadingWithText heading="Fear of sabotage" text={q.scale.sabotage} isRed={parseInt(q.scale.sabotage) > 3} />
      <HeadingWithText
        heading="Confidence in success"
        text={q.scale.confident}
        isRed={parseInt(q.scale.confident) < 3}
      />
    </>
  );
};

const Sleep = ({ q }) => {
  return (
    <>
      <Heading heading="Sleep" />
      <HeadingWithText heading="Hours" text={q.sleep.hours} isRed={q.sleep.hours === "< 6"} />
      <HeadingWithText heading="Problems" text={q.sleep.problems} isRed={q.sleep.problems === "Yes"} />
      <HeadingWithText heading="Feel Rested" text={q.sleep.rested} isRed={q.sleep.rested === "No"} />
    </>
  );
};

const Hide = ({ q }) => {
  const choices = {
    heading: "Hide Eating",
    options: [
      { id: "No", label: "No" },
      { id: "Sometimes", label: "Sometimes" },
      { id: "Often", label: "Often" },
      { id: "Always", label: "Always" },
    ],
  };

  return <RadioOption answer={q.hide.answer} choices={choices} />;
};

const Compensate = ({ q }) => {
  return <YesNoRadio heading="Compensate (fasting, vomiting, laxatives..)" answer={q.compensate.answer} />;
};

const DietaryProblems = ({ q }) => {
  if (q.dietaryProblem.answer.length === 0) return null;
  const dList = q.dietaryProblem.answer.toString();

  return (
    <>
      <Heading heading="Dietary Problems" />
      <HeadingWithText heading="Reasons" text={dList} isRed={false} />
    </>
  );
};

const Importance = ({ q }) => {
  const choices = {
    heading: "Importance",
    options: [
      { id: "low", label: "Low importance" },
      { id: "medium", label: "Don't want to work too hard." },
      { id: "important", label: "Ready to make a change." },
      { id: "extremely", label: "Extremely important" },
    ],
  };

  return <RadioOption answer={q.importance.answer} choices={choices} />;
};

const FamilyMember = (props) => {
  const { label, value } = props;

  if (value === "N/A") return null;

  return <HeadingWithText heading={label} text={value + " weight"} />;
};

const Household = ({ q }) => {
  return (
    <>
      <Heading heading="Household" />
      <FamilyMember label="Spouse" value={q.household.spouse} />
      <FamilyMember label="Child One" value={q.household.child1} />
      <FamilyMember label="Child Two" value={q.household.child2} />
      <FamilyMember label="Child Three" value={q.household.child3} />
      <FamilyMember label="Child Four" value={q.household.child4} />
      <FamilyMember label="Other" value={q.household.other} />
    </>
  );
};

const Motivation = ({ q }) => {
  if (q.motivation.answer.length === 0) return null;
  const mList = q.motivation.answer.toString();

  return (
    <>
      <Heading heading="Motivation" />
      <HeadingWithText heading="Reasons" text={mList} isRed={false} />
    </>
  );
};

const GeneralHealth = ({ q }) => {
  const choices = {
    heading: "General Health",
    options: [
      { id: "excellent", label: "Excellent" },
      { id: "good", label: "Good" },
      { id: "average", label: "Average" },
      { id: "poor", label: "Poor" },
    ],
  };
  return <RadioOption answer={q.generalHealth.answer} choices={choices} />;
};

const StayedSame = ({ q }) => {
  return <YesNoRadio heading="Stayed Same Weight" answer={q.stayedSame.answer} />;
};

const TryingToLose = ({ q }) => {
  const choices = {
    heading: "Trying To Lose",
    options: [
      { id: "1", label: "Less than one month" },
      { id: "1-3", label: "One to three months" },
      { id: "3-6", label: "Three to six months" },
      { id: "6-12", label: "Six months to one year" },
      { id: "1-3y", label: "One to three years" },
      { id: "3+y", label: "More than three years" },
    ],
  };

  return <RadioOption answer={q.tryingToLose.answer} choices={choices} />;
};

const FamilyHistory = ({ q }) => {
  return (
    <>
      <Heading heading="Family History" />
      <CheckBox answer={q.familyHistory.heartDisease} option="heartDisease" />
      <CheckBox answer={q.familyHistory.diabetes} option="diabetes" />
      <CheckBox answer={q.familyHistory.cholesterol} option="cholesterol" />
      <CheckBox answer={q.familyHistory.thyroid} option="thyroid" />
      <CheckBox answer={q.familyHistory.none} option="None" />
    </>
  );
};

const Surgeries = ({ q }) => {
  return <YesNoRadio heading="Surgeries" answer={q.surgeries.answer} text={q.surgeries.explain} />;
};

const MedicalHistory = ({ q }) => {
  return (
    <>
      <Heading heading="Medical History" />
      <CheckBox
        answer={q.medicalHistory.hypertension}
        option="Hypertension"
        text={q.medicalHistory.hypertensionExplain}
      />
      <CheckBox
        answer={q.medicalHistory.heartFailure}
        option="Congestive Heart Failure"
        text={q.medicalHistory.heartFailureExplain}
      />
      <CheckBox
        answer={q.medicalHistory.heartAttack}
        option="Heart Attack"
        text={q.medicalHistory.heartAttackExplain}
      />
      <CheckBox
        answer={q.medicalHistory.cardiacArrhythmias}
        option="Cardiac Arrhythmias"
        text={q.medicalHistory.cardiacArrhythmiasExplain}
      />
      <CheckBox answer={q.medicalHistory.stroke} option="Stroke" text={q.medicalHistory.strokeExplain} />
      <CheckBox
        answer={q.medicalHistory.thyroidDisease}
        option="Thyroid Disease"
        text={q.medicalHistory.thyroidDiseaseExplain}
      />
      <CheckBox
        answer={q.medicalHistory.lungProblems}
        option="Lung Problems"
        text={q.medicalHistory.lungProblemsExplain}
      />
      <CheckBox
        answer={q.medicalHistory.pulmonaryHypertension}
        option="Pulmonary Hypertension"
        text={q.medicalHistory.pulmonaryHypertensionExplain}
      />
      <CheckBox answer={q.medicalHistory.diabetes} option="Diabetes" text={q.medicalHistory.diabetesExplain} />
      <CheckBox answer={q.medicalHistory.parkinsons} option="Parkinsons" text={q.medicalHistory.parkinsonsExplain} />
      <CheckBox
        answer={q.medicalHistory.anemia}
        option="Anemia/Iron Deficiency"
        text={q.medicalHistory.anemiaExplain}
      />
      <CheckBox
        answer={q.medicalHistory.heartburn}
        option="Heartburn/Reflux"
        text={q.medicalHistory.heartburnExplain}
      />
      <CheckBox answer={q.medicalHistory.arthritis} option="Arthritis" text={q.medicalHistory.arthritisExplain} />
      <CheckBox
        answer={q.medicalHistory.sexualDysfunction}
        option="Sexual Dysfunction"
        text={q.medicalHistory.sexualDysfunctionExplain}
      />
      <CheckBox
        answer={q.medicalHistory.fibromyalgia}
        option="Fibromyalgia"
        text={q.medicalHistory.fibromyalgiaExplain}
      />
      <CheckBox
        answer={q.medicalHistory.depression}
        option="Depression/Anxiety"
        text={q.medicalHistory.depressionExplain}
      />
      <CheckBox answer={q.medicalHistory.seizures} option="Seizures" text={q.medicalHistory.seizuresExplain} />
      <CheckBox answer={q.medicalHistory.menopause} option="Menopause" text={q.medicalHistory.menopauseExplain} />
      <CheckBox
        answer={q.medicalHistory.bloodDonations}
        option="Frequent Blood Donations"
        text={q.medicalHistory.bloodDonationsExplain}
      />
      <CheckBox
        answer={q.medicalHistory.lupus}
        option="Connective Tissue Disease"
        text={q.medicalHistory.lupusExplain}
      />
      <CheckBox answer={q.medicalHistory.cancer} option="Cancer" text={q.medicalHistory.cancerExplain} />
      <CheckBox
        answer={q.medicalHistory.congestion}
        option="Nasal Allergies/Congestion"
        text={q.medicalHistory.congestionExplain}
      />
      <CheckBox
        answer={q.medicalHistory.kidneyDisease}
        option="End Stage Kidney Disease"
        text={q.medicalHistory.kidneyDiseaseExplain}
      />
      <CheckBox answer={q.medicalHistory.none} option="None" />
    </>
  );
};
const LowestWeight = ({ q }) => {
  return (
    <>
      <Heading heading="Reach Lowest Weight" />
      <CheckBox answer={q.lowestWeight.diet} option="diet" isRed={false} />
      <CheckBox answer={q.lowestWeight.exercise} option="exercise" isRed={false} />
      <CheckBox answer={q.lowestWeight.prescription} option="prescription" isRed={false} />
      <CheckBox answer={q.lowestWeight.surgery} option="surgery" isRed={false} />
      <CheckBox answer={q.lowestWeight.counseling} option="counseling" isRed={false} />
      <CheckBox answer={q.lowestWeight.none} option="none" isRed={false} />
    </>
  );
};

const Measurements = ({ q }) => {
  const m = q.measurement;
  return (
    <>
      <Heading heading="Personal Info" />
      <HeadingWithText heading="Height:" text={`${m.feet}' ${m.inches}" ${m.currentWeight}lbs`} />
      <HeadingWithText heading="Weight:" text={`${m.currentWeight}lbs Goal:${m.goalWeight}lbs.`} />
      <HeadingWithText heading="Heaviest:" text={`${m.heaviestWeight}lbs Age:${m.heaviestWeightAge}`} />
      <HeadingWithText heading="Lowest:" text={`${m.lowestWeight}lbs Age:${m.lowestWeightAge}`} />
    </>
  );
};

export const WeightQuestionnaire = (props) => {
  const { q } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <Measurements q={q} />
      <LowestWeight q={q} />
      <MedicalHistory q={q} />
      <Surgeries q={q} />
      <FamilyHistory q={q} />
      <TryingToLose q={q} />
      <StayedSame q={q} />
      <GeneralHealth q={q} />
      <Motivation q={q} />
      <Household q={q} />
      <Importance q={q} />
      <DietaryProblems q={q} />
      <Compensate q={q} />
      <Hide q={q} />
      <Sleep q={q} />
      <Scale q={q} />
      <Caffeinated q={q} />
      <Smoking q={q} />
      <Mental q={q} />
      <Describes q={q} />
      <OtherPlans q={q} />
      <PlanExplain q={q} />
      <Diet q={q} />
      <Exercise q={q} />
      <Reasons q={q} />
      <AnythingElse q={q} />
    </Paper>
  );
};
