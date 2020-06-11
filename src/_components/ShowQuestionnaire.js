import React from "react";
import {
  EdQuestionnaire,
  AllergyQuestionnaire,
  SleepQuestionnaire,
  WeightQuestionnaire,
  UnderConstruction,
} from "./Questionnaires";

export const ShowQuestionnaire = (props) => {
  const { questionnaire } = props;

  if (questionnaire.type === "ED") return <EdQuestionnaire q={questionnaire} />;
  if (questionnaire.type === "ALLERGY")
    return <AllergyQuestionnaire q={questionnaire} />;
  if (questionnaire.type === "SLEEP")
    return <SleepQuestionnaire q={questionnaire} />;
    if (questionnaire.type === "WEIGHT")
    return <WeightQuestionnaire q={questionnaire} />;

  return <UnderConstruction />;
};
