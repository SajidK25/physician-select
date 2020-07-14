import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { CheckBox, AnythingElse, Heading, HeadingWithText, HeadingWithOptions, HeadingWithYesNo, YesNoRadio } from "./";
import { TreatmentPlan } from "../TreatmentPlan";

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

const AnemiaThyroid = ({ q }) => {
  return (
    <>
      <Heading heading="Anemia/Thyroid Issues" />
      <CheckBox answer={q.anemiaThyroid.lowIron} option="Low Iron Levels" />
      <CheckBox answer={q.anemiaThyroid.brittleNails} option="Brittle Nails" />
      <CheckBox answer={q.anemiaThyroid.lowThyroid} option="Low Thyroid Levels" />
      <CheckBox answer={q.anemiaThyroid.coldIntolerance} option="Cold Intolerance" />
      <CheckBox answer={q.anemiaThyroid.fatigue} option="Fatigue" />
      <CheckBox answer={q.anemiaThyroid.weighthGain} option="Weight Gain" />
      <CheckBox answer={q.anemiaThyroid.none} option="None" />
    </>
  );
};

const Conditions = ({ q }) => {
  return (
    <>
      <Heading heading="Medical Conditions" />
      <CheckBox
        answer={q.conditions.noTreatment}
        option="Advised not to seek treatment"
        text={q.conditions.noTreatmentExplain}
      />
      <CheckBox answer={q.conditions.kidney} option="Kidney Transplant/Condition" text={q.conditions.kidneyExplain} />
      <CheckBox answer={q.conditions.liver} option="Liver Disease" text={q.conditions.liverExplain} />
      <CheckBox
        answer={q.conditions.neurological}
        option="Neurological Problems"
        text={q.conditions.neurologicalExplain}
      />
      <CheckBox answer={q.conditions.spinal} option="Spinal Injury/Paralysis" text={q.conditions.spinalExplain} />
      <CheckBox
        answer={q.conditions.pelvis}
        option="Surgery/Radiation Pelvis/Prostate"
        text={q.conditions.pelvisExplain}
      />
      <CheckBox answer={q.conditions.stomach} option="Stomach/Intestinal/Ulcers" text={q.conditions.stomachExplain} />
      <CheckBox answer={q.conditions.none} option="None" />
    </>
  );
};

const Lifestyle = ({ q }) => {
  return (
    <>
      <Heading heading="Lifestyle" />
      <CheckBox answer={q.lifestyle.overweight} option="> 50lbs. Overweight" />
      <CheckBox answer={q.lifestyle.smoke} option="Smoke" />
      <CheckBox answer={q.lifestyle.alcohol} option="> 2 alcoholic drinks per day" />
      <CheckBox answer={q.lifestyle.none} option="None" />
    </>
  );
};

const Exam = ({ q }) => {
  const examOptions = [
    { id: "normal", label: "Normal" },
    { id: "issues", label: "Issues" },
    { id: "notExamined", label: "Not examined" },
  ];

  return (
    <>
      <Heading heading="Exam" />
      <HeadingWithText heading="Physical Exam" text={q.physicalExam} isRed={q.physicalExam === "no"} />
      {q.physicalExam !== "no" && (
        <HeadingWithOptions
          heading="Hair Exam"
          value={q.hairExam}
          options={examOptions}
          isRed={q.hairExam === "issues"}
        />
      )}
      {q.physicalExam === "issues" && <HeadingWithText heading="Explaination" text={q.explainExam} isRed={true} />}
    </>
  );
};

const Women = ({ q }) => {
  const periodOptions = [
    { id: "regular", label: "Regular" },
    { id: "irregular", label: "Irregular" },
  ];
  // This option isn't selected for males
  if (q.women.period === "") return null;

  return (
    <>
      <Heading heading="Conditions (Women)" />
      <HeadingWithOptions heading="Periods" value={q.women.period} options={periodOptions} />
      <CheckBox answer={q.women.pregnant} option="Difficulty becoming pregnant" />
      <CheckBox answer={q.women.postmenopausal} option="Postmenopausal" text={q.women.postmenopausalExplain} />
      <CheckBox answer={q.women.hysterectomy} option="Hysterectomy" text={q.women.hysterectomyExplain} />
      <CheckBox answer={q.women.ovaries} option="Ovaries Removed" text={q.women.ovariesExplain} />
      <CheckBox answer={q.women.none} option="None" />
    </>
  );
};

const Colored = ({ q }) => {
  return <YesNoRadio heading="How often Colored/Processed/Straightened" answer={q.colored.answer} />;
};

const Treatments = ({ q }) => {
  return <YesNoRadio heading="Tried Treatments?" answer={q.treatments.answer} text={q.treatments.explain} />;
};

const Relatives = ({ q }) => {
  return (
    <>
      <Heading heading="Relatives with Hair Loss" />
      <CheckBox answer={q.relatives.grandfather} option="Grandfather" />
      <CheckBox answer={q.relatives.grandmother} option="Grandmother" />
      <CheckBox answer={q.relatives.father} option="Father" />
      <CheckBox answer={q.relatives.mother} option="Mother" />
      <CheckBox answer={q.relatives.brother} option="Brother" />
      <CheckBox answer={q.relatives.sister} option="Sister" />
      <CheckBox answer={q.relatives.none} option="None" />
    </>
  );
};

const Scalp = ({ q }) => {
  return (
    <>
      <Heading heading="Scalp Conditions" />
      <CheckBox answer={q.scalp.itch} option="Itching" />
      <CheckBox answer={q.scalp.burn} option="Buring" />
      <CheckBox answer={q.scalp.hurt} option="Pain" />
      <CheckBox answer={q.scalp.rash} option="Rash" />
      <CheckBox answer={q.scalp.flaking} option="Flaking" />
      <CheckBox answer={q.scalp.none} option="None" />
    </>
  );
};

const Dieting = ({ q }) => {
  return (
    <>
      <Heading heading="Dieting" />
      <CheckBox answer={q.dieting.actively} option="Actively dieting" text={q.dieting.activelyExplain} />
      <CheckBox answer={q.dieting.vegan} option="Vegan/Vegetarian" />
      <CheckBox answer={q.dieting.none} option="None" />
    </>
  );
};

const History = ({ q }) => {
  return (
    <>
      <Heading heading="Conditions History" />
      <CheckBox answer={q.history.anemia} option="Anemia" text={q.history.anemiaExplain} />
      <CheckBox answer={q.history.thyroid} option="Thyroid disorder" text={q.history.thyroidExplain} />
      <CheckBox answer={q.history.none} option="None" />
    </>
  );
};

const Significant = ({ q }) => {
  return (
    <>
      <Heading heading="Significant Life Events" />
      <CheckBox answer={q.significant.medical} option="Medical Issues" text={q.significant.medicalExplain} />
      <CheckBox answer={q.significant.stress} option="Stress" text={q.significant.stressExplain} />
      <CheckBox answer={q.significant.diet} option="Weight loss/Diet change" text={q.significant.dietExplain} />
      <CheckBox answer={q.significant.none} option="None" />
    </>
  );
};
const SixMonthsPrior = ({ q }) => {
  return (
    <>
      <Heading heading="Six Months Prior" />
      <CheckBox answer={q.sixMonth.medications} option="New Medications" text={q.sixMonth.medicationsExplain} />
      <CheckBox answer={q.sixMonth.hormones} option="Started/Stopped Hormones" text={q.sixMonth.hormonesExplain} />
      <CheckBox answer={q.sixMonth.none} option="None" />
    </>
  );
};

const LabWork = ({ q }) => {
  const classes = useStyles();

  console.log("LabWork:", q.labWork);

  if (q.labWork.answer !== "yes" || !q.labWork.fileName) return null;

  return (
    <>
      <Heading heading="Lab Work" />
      <div className={classes.labwork}>
        <a href={q.labWork.fileName}>Lab Work Link</a>
      </div>
    </>
  );
};

const Where = ({ q, gender }) => {
  const classes = useStyles();
  const imageName = require(`../../_images/HairLoss-${gender === "female" ? "Female" : "Male"}-${
    q.hairLoss.where
  }.png`);

  return <img className={classes.image} src={imageName} alt="hair guy" />;
};

const Hairloss = ({ q }) => {
  const typeOptions = [
    { id: "breaking", label: "Breaking off" },
    { id: "roots", label: "Coming out at the roots" },
    { id: "unsure", label: "Unsure" },
  ];

  return (
    <>
      <Heading heading="Hair Loss" />
      <HeadingWithText heading="Time Span" text={q.hairLoss.timeSpan} />
      <HeadingWithText heading="Degree of Loss" text={q.hairLoss.degree} />
      <HeadingWithText heading="Rate of Change" text={q.hairLoss.change} />
      <HeadingWithText heading="How Rapid" text={q.hairLoss.rapid} />
      <HeadingWithOptions heading="Type of Loss" options={typeOptions} value={q.hairLoss.type} />
      <HeadingWithYesNo heading="Shedding?" value={q.hairLoss.shedding} />
      <HeadingWithYesNo heading="Thinning?" value={q.hairLoss.thinning} />
      <HeadingWithText heading="Reason" text={q.hairLoss.reason} />
    </>
  );
};

export const HairQuestionnaire = ({ q, user }) => {
  const classes = useStyles();
  console.log("User", user);

  return (
    <Paper className={classes.container}>
      <Hairloss q={q} />
      <Where q={q} gender={user.gender} />
      <LabWork q={q} />
      <SixMonthsPrior q={q} />
      <Significant q={q} />
      <History q={q} />
      <Dieting q={q} />
      <Scalp q={q} />
      <Relatives q={q} />
      <Treatments q={q} />
      <Colored q={q} />
      <Exam q={q} />
      <Women q={q} />
      <Lifestyle q={q} />
      <Conditions q={q} />
      <AnemiaThyroid q={q} />
      <AnythingElse q={q} />
    </Paper>
  );
};

/*

  labWork: {
    answer: "",
    fileName: ""
  },

 */
