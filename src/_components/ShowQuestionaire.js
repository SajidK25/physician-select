import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: 16,
    fontWeight: 500,
  },
  item: {
    fontSize: 14,
    fontWeight: 400,
    marginLeft: theme.spacing(2),
  },
  text: {
    fontSize: 14,
    marginLeft: theme.spacing(4),
  },
  container: {
    flex: 1,
    overflow: "auto",
    padding: theme.spacing(2),
    margin: theme.spacing(1),
  },
}));

const Heading = ({ heading }) => {
  const classes = useStyles();

  return <Typography className={classes.heading}>{heading}</Typography>;
};

const Text = ({ text }) => {
  const classes = useStyles();

  return (
    <>
      {text && (
        <Typography color="error" className={classes.text}>
          {text}
        </Typography>
      )}
    </>
  );
};

const Item = ({ item }) => {
  const classes = useStyles();
  return <Typography className={classes.item}>{item}</Typography>;
};

const QueItem = (props) => {
  const { options, heading, text } = props;

  return (
    <>
      <Heading heading={heading} />
      {options.map((o) => (
        <React.Fragment key={o.item}>
          <Item item={o.item} />
          <Text text={text} />
        </React.Fragment>
      ))}
    </>
  );
};

const CheckBox = (props) => {
  const { answer, option, text } = props;
  const classes = useStyles();
  const color = option === "None" ? "textPrimary" : "error";

  return (
    answer && (
      <>
        <Typography color={color} className={classes.item}>
          {option}
        </Typography>
        <Text text={text} />
      </>
    )
  );
};

const erectionChoices = {
  heading: "Problems getting an Erection",
  options: [
    { id: "every_time", label: "Every time" },
    { id: "sometimes", label: "Sometimes" },
    { id: "rarely", label: "Rarely" },
  ],
};

const problemsBegan = {
  heading: "How Erectile Dysfunction Started",
  options: [
    { id: "gradually", label: "Gradually" },
    { id: "suddenly", label: "Suddenly" },
  ],
};

const newPartner = {
  heading: "New Partner",
  options: [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
  ],
};

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

const depression = {
  heading: "How often",
  options: [
    { id: "severalDays", label: "Several days" },
    { id: "moreThanHalf", label: "More than half of the days" },
    { id: "nearlyEvery", label: "Every or nearly every day" },
  ],
};

const RadioOption = (props) => {
  const { choices, answer, text } = props;
  const options = [];

  console.log(choices);
  console.log(answer);
  console.log(choices.heading);

  const choice = choices.options.find((c) => c.id === answer);
  if (!choice) return null;
  options.push({ item: choice.label });

  return <QueItem heading={choices.heading} options={options} text={text} />;
};

const UnderConstruction = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <p>Under Construction</p>
    </Paper>
  );
};

const EdQuestionaire = (props) => {
  const { q } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <RadioOption answer={q.getErections} choices={erectionChoices} />
      <RadioOption
        answer={q.problemsBegan}
        choices={problemsBegan}
        text={q.explainSuddenly}
      />
      <RadioOption answer={q.newPartner} choices={newPartner} />
      <RadioOption
        answer={q.erectionsWhen.masturbatingErection}
        choices={whenMasturbating}
      />
      <RadioOption answer={q.erectionsWhen.wakingErection} choices={onWaking} />
      <RadioOption answer={q.libido} choices={libido} />
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
        <RadioOption answer={q.depression.frequency} choices={depression} />
      )}
      <Heading heading="Lifestyle Habits" />
      <CheckBox answer={q.lifestyle.smoke} option="Smoke tobacco" />
      <CheckBox
        answer={q.lifestyle.overweight}
        option="Over 50lbs. overweight"
      />
      <CheckBox
        answer={q.lifestyle.alcohol}
        option="More than 2 alcoholic drinks per day"
      />
      <CheckBox answer={q.lifestyle.poppers} option="Poppers or Rush" />
      <CheckBox answer={q.lifestyle.none} option="None" />
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
      <CheckBox
        answer={q.otherConditions.myeloma}
        option="Myeloma or leukemia"
      />
      <CheckBox answer={q.otherConditions.none} option="None" />
      <Heading heading="Hypertension Medications" />
      <CheckBox
        answer={q.hypertensionMeds.alphaBlockers}
        option="Alpha blockers"
      />
      <CheckBox answer={q.hypertensionMeds.sildenafil} option="Sildenafil" />
      <CheckBox answer={q.hypertensionMeds.riociguat} option="Riociguat" />
      <CheckBox answer={q.hypertensionMeds.none} option="None" />

      {/*



//   hypertensionMeds: {
//     sildenafil: false,
//     sildenafilExplain: "",
//     riociguat: false,
//     riociguatExplain: "",
//     alphaBlockers: false,
//     alphaBlockersExplain: "",
//     none: false
//   },
//   edMeds: {
//     viagra: false,
//     viagraDose: "",
//     viagraWorked: false,
//     viagraSideEffects: "",
//     cialis: false,
//     cialisDose: "",
//     cialisWorked: false,
//     cialisSideEffects: "",
//     levitra: false,
//     levitraDose: "",
//     levitraWorked: false,
//     levitraSideEffects: "",
//     avanafil: false,
//     avanafilDose: "",
//     avanafilWorked: false,
//     avanafilSideEffects: "",
//     other: false,
//     otherExplain: "",
//     none: false
//   },
//   otherMedicines: {
//     taking: "",
//     explain: ""
//   },
//   allergies: {
//     have: "",
//     explain: ""
//   },
//   anythingElse: {
//     answer: "",
//     explain: ""
//   }
      {erectionsWhen: {
//     whenMasturbating: false,
//     masturbatingErection: "",
//     onWaking: false,
//     wakingErection: "",
//     none: false
//   },<RadioOption
        answer={q.problemsBegan}
        choices={problemsBegan}
        text={q.explainSuddenly}
      /> */}
    </Paper>
  );
};

export const ShowQuestionaire = (props) => {
  const { questionnaire } = props;

  if (questionnaire.type === "ED") return <EdQuestionaire q={questionnaire} />;
  return <UnderConstruction />;
};
