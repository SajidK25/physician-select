import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { CheckBox, AnythingElse, Heading, HeadingWithText } from "./";

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

const SleepProblems = ({ q }) => (
  <>
    <Heading heading="Sleep Problems" />
    <CheckBox answer={q.sleepProblems.falling} option={"Falling asleep"} text={q.sleepProblems.fallingExplain} />
    <CheckBox answer={q.sleepProblems.staying} option={"Staying asleep"} />
    <CheckBox answer={q.sleepProblems.stayingAwake} option={"Staying awake during day"} />
    <CheckBox answer={q.sleepProblems.nightmares} option={"Nightmares"} />
    <CheckBox answer={q.sleepProblems.unexpected} option={"Fall asleep unexpectedly"} />
    <CheckBox
      answer={q.sleepProblems.accident}
      option={"Caused accident (or near-miss)"}
      text={q.sleepProblems.accidentExplain}
    />
    <CheckBox answer={q.sleepProblems.tooEarly} option={"Wake up too early"} />
    <CheckBox answer={q.sleepProblems.none} option={"None"} />
  </>
);

const OtherMedications = ({ q }) => (
  <>
    <Heading heading="Other Medications" />
    <CheckBox answer={q.otherMeds.hydrocodone} option="Hydrocodone" />
    <CheckBox answer={q.otherMeds.bupropion} option="Bupropion" />
    <CheckBox answer={q.otherMeds.cimetidine} option="Cimetidine" />
    <CheckBox answer={q.otherMeds.stJohnsWart} option="St John's Wort" />
    <CheckBox answer={q.otherMeds.terbinafine} option="Terbinafine" />
    <CheckBox answer={q.otherMeds.tolazamide} option="Tolazamide" />
    <CheckBox answer={q.otherMeds.antiDepressants} option="Antidepressants" text={q.otherMeds.heartMedsExplain} />
    <CheckBox answer={q.otherMeds.heartMeds} option="Heart Meds" text={q.otherMeds.heartMedsExplain} />
    <CheckBox answer={q.otherMeds.mesoridazine} option="Mesoridazine" />
    <CheckBox answer={q.otherMeds.ketoconazole} option="Ketoconazole" />
    <CheckBox answer={q.otherMeds.safinamide} option="Safinamide" />
    <CheckBox answer={q.otherMeds.none} option="None" />
  </>
);

const SleepIssues = ({ q }) => (
  <>
    <Heading heading="Sleep Issues" />
    <CheckBox answer={q.sleepIssues.takeSomething} option="Take something" text={q.sleepIssues.takeSomethingExplain} />
    <CheckBox answer={q.sleepIssues.alcohol} option="Alcohol" text={q.sleepIssues.alcoholExplain} />
    <CheckBox answer={q.sleepIssues.sad} option="Feel sad" />
    <CheckBox answer={q.sleepIssues.nervous} option="Feel nervous" />
    <CheckBox answer={q.sleepIssues.unusualHours} option="Unusual hours" text={q.sleepIssues.unusualHoursExplain} />
    <CheckBox answer={q.sleepIssues.none} option="None" />
  </>
);

const SleepHealth = ({ q }) => (
  <>
    <Heading heading="Sleep Health" />
    <CheckBox answer={q.sleepHealth.legCramps} option="Leg cramps" />
    <CheckBox answer={q.sleepHealth.headache} option="Awaken with headache" />
    <CheckBox answer={q.sleepHealth.urinate} option="Urinate often" />
    <CheckBox answer={q.sleepHealth.difficultyBreathing} option="Difficulty breathing" />
    <CheckBox answer={q.sleepHealth.sweat} option="Sweat excessively" />
    <CheckBox answer={q.sleepHealth.dryMouth} option="Dry mouth/sore throat" />
    <CheckBox answer={q.sleepHealth.none} option="None" />
  </>
);

const SleepBehavior = ({ q }) => (
  <>
    <Heading heading="Sleep Behavior" />
    <HeadingWithText heading="Bedtime (weekdays)" text={moment(q.sleepBehavior.bedtimeWeekday).format("h:mma")} />
    <HeadingWithText heading="Bedtime (weekends)" text={moment(q.sleepBehavior.bedtimeWeekend).format("h:mma")} />
    {q.sleepBehaviorNaps && (
      <>
        <HeadingWithText heading="Naps" text={q.sleepBehavior.naps} />
        <HeadingWithText heading="Awaken refreshed" text={q.sleepBehavior.awakenRefreshed} />
      </>
    )}
  </>
);
const SleepHistory = ({ q }) => (
  <>
    <Heading heading="Sleep History" />
    <CheckBox answer={q.sleepHistory.sleepStudy} option="Sleep study" text={q.sleepHistory.sleepStudyExplain} />
    <CheckBox answer={q.sleepHistory.useCPAP} option="Use CPAP or BiPAP" text={q.sleepHistory.useCPAPExplain} />
    <CheckBox answer={q.sleepHistory.tonsilsRemoved} option="Tonsils removed" />
    <CheckBox answer={q.sleepHistory.sinusSurgery} option="Sinus surgery" />
    <CheckBox answer={q.sleepHistory.brokenNose} option="Broken nose" />
    <CheckBox answer={q.sleepHistory.headInjury} option="Head injury" />
    <CheckBox
      answer={q.sleepHistory.distruptConditions}
      option="Conditions that disrupt sleep"
      text={q.sleepHistory.disruptConditionsExplain}
    />
    <CheckBox answer={q.sleepHistory.childProblems} option="Childhood problems" />
    <CheckBox answer={q.sleepHistory.hadExam} option="Exam in last five years" />
    <CheckBox answer={q.sleepHistory.none} option="None" />
  </>
);

const SleepSymptoms = ({ q }) => (
  <>
    <Heading heading="Sleep Symptoms" />
    <CheckBox answer={q.sleepSymptoms.restlessLegs} option="Restless legs" />
    <CheckBox answer={q.sleepSymptoms.snoring} option="Snore, stop breathing, gasp..." />
    <CheckBox answer={q.sleepSymptoms.kicking} option="Kicking partner" text={q.sleepSymptoms.kickingExplain} />
    <CheckBox answer={q.sleepSymptoms.grindTeeth} option="Grind teeth" />
    <CheckBox answer={q.sleepSymptoms.none} option="None" />
  </>
);

const MedicalHistory = ({ q }) => (
  <>
    <Heading heading="Medical History" />
    <CheckBox
      answer={q.sleepMedHistory.hypertension}
      option="Hypertension"
      text={q.sleepMedHistory.hypertensionExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.heartFailure}
      option="Heart failure"
      text={q.sleepMedHistory.heartFailureExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.heartAttack}
      option="Heart attack"
      text={q.sleepMedHistory.heartAttackExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.cardiacArrhythmias}
      option="Cardiac arrhythmias"
      text={q.sleepMedHistory.cardiacArrhythmiasExplain}
    />
    <CheckBox answer={q.sleepMedHistory.stroke} option="Stroke" text={q.sleepMedHistory.strokeExplain} />
    <CheckBox
      answer={q.sleepMedHistory.thyroidDisease}
      option="Thyroid disease"
      text={q.sleepMedHistory.thyroidDiseaseExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.lungProblems}
      option="Lung problems"
      text={q.sleepMedHistory.lungProblemsExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.pulmonaryHypertension}
      option="Pulmonary hypertension"
      text={q.sleepMedHistory.pulmonaryHypertensionExplain}
    />
    <CheckBox answer={q.sleepMedHistory.diabetes} option="Diabetes" text={q.sleepMedHistory.diabetesExplain} />
    <CheckBox answer={q.sleepMedHistory.parkinsons} option="Parkinsons" text={q.sleepMedHistory.parkinsonsExplain} />
    <CheckBox answer={q.sleepMedHistory.anemia} option="Anemia" text={q.sleepMedHistory.anemiaExplain} />
    <CheckBox
      answer={q.sleepMedHistory.heartburn}
      option="Heartburn/Reflux"
      text={q.sleepMedHistory.heartburnExplain}
    />
    <CheckBox answer={q.sleepMedHistory.arthritis} option="Arthritis" text={q.sleepMedHistory.arthritisExplain} />
    <CheckBox
      answer={q.sleepMedHistory.sexualDysfunction}
      option="Sexual dysfunction"
      text={q.sleepMedHistory.sexualDysfunctionExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.fibromyalgia}
      option="Fibromyalgia"
      text={q.sleepMedHistory.fibromyalgiaExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.depression}
      option="Depression/Anxiety"
      text={q.sleepMedHistory.depressionExplain}
    />
    <CheckBox answer={q.sleepMedHistory.seizures} option="Seizures" text={q.sleepMedHistory.seizuresExplain} />
    <CheckBox answer={q.sleepMedHistory.menopause} option="Menopause" text={q.sleepMedHistory.menopauseExplain} />
    <CheckBox
      answer={q.sleepMedHistory.bloodDonations}
      option="Frequent blood donations"
      text={q.sleepMedHistory.bloodDonationsExplain}
    />
    <CheckBox answer={q.sleepMedHistory.lupus} option="Lupus" text={q.sleepMedHistory.lupusExplain} />
    <CheckBox answer={q.sleepMedHistory.cancer} option="Cancer" text={q.sleepMedHistory.cancerExplain} />
    <CheckBox
      answer={q.sleepMedHistory.congestion}
      option="Nasal allergies/congestion"
      text={q.sleepMedHistory.congestionExplain}
    />
    <CheckBox
      answer={q.sleepMedHistory.kidneyDisease}
      option="End stage kidney disease"
      text={q.sleepMedHistory.kidneyDiseaseExplain}
    />
    <CheckBox answer={q.sleepMedHistory.none} option="None" />
  </>
);

const SleepHabits = ({ q }) => (
  <>
    <Heading heading="Sleep Habits" />
    <CheckBox answer={q.sleepHabits.watchTV} option="Watch TV/read in bed" />
    <CheckBox answer={q.sleepHabits.shareBed} option="Share bed" />
    <CheckBox answer={q.sleepHabits.partnerDisorder} option="Partner with sleep disorder" />
    <CheckBox answer={q.sleepHabits.pets} option="Pets" />
    <CheckBox answer={q.sleepHabits.drinkCaffeine} option="Drink caffeine" text={q.sleepHabits.drinkCaffeineExplain} />
    <CheckBox answer={q.sleepHabits.exercise} option="Exercise regularly" />
    <CheckBox answer={q.sleepHabits.none} option="None" />
  </>
);

const Dozing = ({ heading, answer }) => (
  <>{answer && answer !== "Never" && <HeadingWithText heading={heading} text={answer} isRed={true} />}</>
);

const SleepDozing = ({ q }) => (
  <>
    <Heading heading="Dozing Off" />
    <Dozing heading="Reading" answer={q.sleepDozing.reading} />
    <Dozing heading="Watching TV" answer={q.sleepDozing.watchingTV} />
    <Dozing heading="Sitting" answer={q.sleepDozing.sitting} />
    <Dozing heading="Public place" answer={q.sleepDozing.publicPlace} />
    <Dozing heading="Passenger" answer={q.sleepDozing.passenger} />
    <Dozing heading="Lying Down" answer={q.sleepDozing.lyingDown} />
    <Dozing heading="Talking" answer={q.sleepDozing.talking} />
    <Dozing heading="After Lunch" answer={q.sleepDozing.afterLunch} />
  </>
);

const ShowFamily = ({ family, subheading }) => {
  if (family.length === 0) return null;
  const fd = family.toString();

  return <HeadingWithText heading={subheading} text={fd} isRed={true} />;
};

const SleepFamily = ({ q }) => (
  <>
    <Heading heading="Family History" />
    <ShowFamily family={q.sleepFamily.snoring} subheading="Snoring" />
    <ShowFamily family={q.sleepFamily.narcolepsy} subheading="Narcolepsy" />
    <ShowFamily family={q.sleepFamily.seizures} subheading="Seizures" />
    <ShowFamily family={q.sleepFamily.depression} subheading="Depression" />
    <ShowFamily family={q.sleepFamily.hypertension} subheading="Hypertension" />
    <ShowFamily family={q.sleepFamily.stroke} subheading="Stroke" />
    <ShowFamily family={q.sleepFamily.diabetes} subheading="Diabetes" />
  </>
);

export const SleepQuestionnaire = (props) => {
  const { q } = props;
  const classes = useStyles();

  return (
    <Paper className={classes.container}>
      <OtherMedications q={q} />
      <SleepProblems q={q} />
      <SleepIssues q={q} />
      <SleepHealth q={q} />
      <SleepBehavior q={q} />
      <SleepHistory q={q} />
      <SleepSymptoms q={q} />
      <SleepHabits q={q} />
      <SleepDozing q={q} />
      <MedicalHistory q={q} />
      <SleepFamily q={q} />
      <AnythingElse q={q} />
    </Paper>
  );
};
