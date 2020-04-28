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

const whenMasturbating = {
  heading: "Erection when Masturbating",
  options: [
    { id: "", label: "N/A" },
    { id: "no", label: "No, never remains hard" },
    { id: "rarely", label: "Rarely" },
    { id: "occasionally", label: "Occasionally" },
    { id: "usually", label: "More than half the time" },
    { id: "always", label: "Always" },
  ],
};

const onWaking = {
  heading: "Wake with Erection:",
  options: [
    { id: "", label: "N/A" },
    { id: "rarely", label: "Rarely" },
    { id: "occasionally", label: "Occasionally" },
    { id: "everytime", label: "Everytime" },
  ],
};

const libido = {
  heading: "Libido",
  options: [
    { id: "normal", label: "Normal." },
    {
      id: "less",
      label: "Less than it was.",
    },
    {
      id: "abnormal",
      label: "Abnormal, doesn't think about sex.",
    },
  ],
};

const GetErections = ({ q }) => {
  const choices = {
    heading: "Problems getting an Erection",
    options: [
      { id: "every_time", label: "Every time" },
      { id: "sometimes", label: "Sometimes" },
      { id: "rarely", label: "Rarely" },
    ],
  };
  return <RadioOption answer={q.getErections} choices={choices} />;
};

const ProblemsBegan = ({ q }) => {
  const choices = {
    heading: "How Erectile Dysfunction Started",
    options: [
      { id: "gradually", label: "Gradually" },
      { id: "suddenly", label: "Suddenly" },
    ],
  };

  return (
    <RadioOption
      answer={q.problemsBegan}
      choices={choices}
      text={q.explainSuddenly}
    />
  );
};

const NewPartner = ({ q }) => {
  const choices = {
    heading: "New Partner",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no", label: "No" },
    ],
  };

  return <RadioOption answer={q.newPartner} choices={choices} />;
};

const BotheredBy = ({ q }) => {
  const choices = {
    heading: "How often",
    options: [
      { id: "severalDays", label: "Several days" },
      { id: "moreThanHalf", label: "More than half of the days" },
      { id: "nearlyEvery", label: "Every or nearly every day" },
    ],
  };

  return (
    <>
      <Heading heading="Bothered by the Following" />
      <CheckBox
        answer={q.depression.noInterest}
        option="Little interest in doing things"
      />
      <CheckBox answer={q.depression.feelingDown} option="Feeling down" />
      <CheckBox answer={q.depression.worrying} option="Worrying too much" />
      <CheckBox
        answer={q.depression.anxious}
        option="Feeling nervous, anxious"
      />
      <CheckBox answer={q.depression.none} option="None" />
      {q.depression.frequency && (
        <RadioOption answer={q.depression.frequency} choices={choices} />
      )}
    </>
  );
};

const LifeStyle = ({ q }) => (
  <>
    <Heading heading="Lifestyle Habits" />
    <CheckBox answer={q.lifestyle.smoke} option="Smoke tobacco" />
    <CheckBox answer={q.lifestyle.overweight} option="Over 50lbs. overweight" />
    <CheckBox
      answer={q.lifestyle.alcohol}
      option="More than 2 alcoholic drinks per day"
    />
    <CheckBox answer={q.lifestyle.poppers} option="Poppers or Rush" />
    <CheckBox answer={q.lifestyle.none} option="None" />
  </>
);

const MedicalConditions = ({ q }) => (
  <>
    <Heading heading="Medical Conditions" />
    <CheckBox
      answer={q.conditions.noSex}
      option="Advised not to have sex"
      text={q.conditions.noSexExplain}
    />
    <CheckBox
      answer={q.conditions.kidney}
      option="Kidney condition"
      text={q.conditions.kidneyExplain}
    />
    <CheckBox
      answer={q.conditions.liver}
      option="Liver disease"
      text={q.conditions.liverExplain}
    />
    <CheckBox
      answer={q.conditions.neurological}
      option="Neurological problems"
      text={q.conditions.neurologicalExplain}
    />
    <CheckBox
      answer={q.conditions.spinal}
      option="Spinal injury or paralysis"
      text={q.conditions.spinalExplain}
    />
    <CheckBox
      answer={q.conditions.pelvis}
      option="Surgery or radiation - prostate or pelvis"
      text={q.conditions.pelvisExplain}
    />
    <CheckBox
      answer={q.conditions.stomach}
      option="Stomach, intestinal or bowel ulcers"
      text={q.conditions.stomachExplain}
    />
    <CheckBox answer={q.conditions.none} option="None" />
  </>
);

const GenitalIssues = ({ q }) => (
  <>
    <Heading heading="Genital Issues" />
    <CheckBox
      answer={q.genitalIssues.scarring}
      option="Scarring"
      text={q.genitalIssues.scarringExplain}
    />
    <CheckBox
      answer={q.genitalIssues.curved}
      option="Curve, bend or Peyronie's disease"
      text={q.genitalIssues.curvedExplain}
    />
    <CheckBox
      answer={q.genitalIssues.pain}
      option="Pain with erections or ejaculation"
      text={q.genitalIssues.painExplain}
    />
    <CheckBox
      answer={q.genitalIssues.tight}
      option="Tight foreskin"
      text={q.genitalIssues.tightExplain}
    />
    <CheckBox answer={q.genitalIssues.none} option="None" />
  </>
);

const SeriousHistory = ({ q }) => (
  <>
    <Heading heading="Serious History" />
    <CheckBox
      answer={q.seriousHistory.lowBP}
      option="Severe low blood pressure"
    />
    <CheckBox
      answer={q.seriousHistory.heartAttack}
      option="Heart attack or heart failure"
      text={q.seriousHistory.heartAttackExplain}
    />
    <CheckBox
      answer={q.seriousHistory.stroke}
      option="Stroke"
      text={q.seriousHistory.strokeExplain}
    />
    <CheckBox
      answer={q.seriousHistory.angina}
      option="Angina"
      text={q.seriousHistory.anginaExplain}
    />
    <CheckBox
      answer={q.seriousHistory.claudation}
      option="Peripheral vascular disease or claudication"
      text={q.seriousHistory.claudationExplain}
    />
    <CheckBox
      answer={q.seriousHistory.arrhythmia}
      option="Heart arrhythmia"
      text={q.seriousHistory.arrhythmiaExplain}
    />
    <CheckBox
      answer={q.seriousHistory.valve}
      option="Heart valve problems"
      text={q.seriousHistory.valveExplain}
    />
    <CheckBox
      answer={q.seriousHistory.qtProlongation}
      option="History of QT prolongation"
      text={q.seriousHistory.qtProlongationExplain}
    />
    <CheckBox
      answer={q.seriousHistory.hcm}
      option="Hypertrophic obstructive cardiomyopathy"
      text={q.seriousHistory.hcmExplain}
    />
    <CheckBox answer={q.seriousHistory.none} option="None" />
  </>
);

const SeriousConditions = ({ q }) => (
  <>
    <Heading heading="Serious Conditions" />
    <CheckBox
      answer={q.seriousConditions.chestPain}
      option="Chest pain - 2 flights of stairs"
      text={q.seriousConditions.chestPainExplain}
    />
    <CheckBox
      answer={q.seriousConditions.chestPainWithSex}
      option="Chest pain - with sex"
      text={q.seriousConditions.chestPainWithSexExplain}
    />
    <CheckBox
      answer={q.seriousConditions.dizziness}
      option="Fainting, lightheadedness, or dizziness"
      text={q.seriousConditions.dizzinessExplain}
    />
    <CheckBox
      answer={q.seriousConditions.cramping}
      option="Cramping or pain in the calves or thighs"
      text={q.seriousConditions.crampingExplain}
    />
    <CheckBox
      answer={q.seriousConditions.abnormalHeartBeats}
      option="Abnormal heart beats"
      text={q.seriousConditions.abnormalHeartBeatsExplain}
    />
    <CheckBox answer={q.seriousConditions.none} option="None" />
  </>
);

const OtherConditions = ({ q }) => (
  <>
    <Heading heading="Other Conditions" />
    <CheckBox answer={q.otherConditions.priapism} option="Priapism" />
    <CheckBox
      answer={q.otherConditions.retinitisPigmentosa}
      option="Retinitis pigmentosa or AION"
    />
    <CheckBox
      answer={q.otherConditions.sickleCell}
      option="Sickle cell disease"
    />
    <CheckBox
      answer={q.otherConditions.clotting}
      option="Blood clotting disorder"
    />
    <CheckBox answer={q.otherConditions.myeloma} option="Myeloma or leukemia" />
    <CheckBox answer={q.otherConditions.none} option="None" />
  </>
);

const HypertensionMeds = ({ q }) => (
  <>
    <Heading heading="Hypertension Medications" />
    <CheckBox
      answer={q.hypertensionMeds.alphaBlockers}
      option="Alpha blockers"
    />
    <CheckBox answer={q.hypertensionMeds.sildenafil} option="Sildenafil" />
    <CheckBox answer={q.hypertensionMeds.riociguat} option="Riociguat" />
    <CheckBox answer={q.hypertensionMeds.none} option="None" />
  </>
);

const EdTreatment = ({ name, used, dose, worked, sideEffects }) => {
  if (!used) return null;

  let text = dose + (worked ? " it worked. " : "");
  if (sideEffects) text += " Side Effects: " + sideEffects;

  return <HeadingWithText heading={name} text={text} isRed={true} />;
};

const Exam = ({ q }) => (
  <>
    <Heading heading="Exam" />
    <HeadingWithText
      heading="Physical Exam"
      text={q.physicalExam}
      isRed={q.physicalExam === "no"}
    />
    {q.physicalExam !== "no" && (
      <HeadingWithText
        heading="Genital Exam"
        text={q.genitalExam}
        isRed={q.genitalExam !== "normal"}
      />
    )}
    <HeadingWithText heading="Explaination" text={q.explainExam} isRed={true} />
  </>
);

const TreatedFor = ({ q }) => {
  const ed = q.edMeds;

  return (
    <>
      <Heading heading="ED Treatments" />
      <EdTreatment
        name="Sildenafil"
        used={ed.viagra}
        dose={ed.viagraDose}
        worked={ed.viagraWorked}
        sideEffects={ed.viagraSideEffects}
      />
      <EdTreatment
        name="Tadalafil"
        used={ed.cialis}
        dose={ed.cialisDose}
        worked={ed.cialisWorked}
        sideEffects={ed.cialisSideEffects}
      />
      <EdTreatment
        name="Vardenafil"
        used={ed.levitra}
        dose={ed.levitraDose}
        worked={ed.levitraWorked}
        sideEffects={ed.levitraSideEffects}
      />
      <EdTreatment
        name="Avanafil"
        used={ed.avanafil}
        dose={ed.avanafilDose}
        worked={ed.avanafilWorked}
        sideEffects={ed.avanafilSideEffects}
      />
      <CheckBox
        answer={ed.other}
        option="Other treatments"
        text={ed.otherExplain}
      />
      <CheckBox answer={ed.none} option="None" />
    </>
  );
};

export const EdQuestionnaire = (props) => {
  const { q } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <GetErections q={q} />
      <ProblemsBegan q={q} />
      <NewPartner q={q} />
      <RadioOption
        answer={q.erectionsWhen.masturbatingErection}
        choices={whenMasturbating}
      />
      <RadioOption answer={q.erectionsWhen.wakingErection} choices={onWaking} />
      <Exam q={q} />
      <RadioOption answer={q.libido} choices={libido} />
      <BotheredBy q={q} />
      <LifeStyle q={q} />
      <MedicalConditions q={q} />
      <GenitalIssues q={q} />
      <SeriousHistory q={q} />
      <SeriousConditions q={q} />
      <OtherConditions q={q} />
      <HypertensionMeds q={q} />
      <TreatedFor q={q} />
      <AnythingElse q={q} />
    </Paper>
  );
};
