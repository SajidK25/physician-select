import React from "react";
import {
  EdQuestionnaire,
  AllergyQuestionnaire,
  SleepQuestionnaire,
  WeightQuestionnaire,
  HairQuestionnaire,
  JoyQuestionnaire,
  UnderConstruction,
} from "./Questionnaires";

export const ShowQuestionnaire = ({ questionnaire, user }) => {
  if (questionnaire.type === "ED") return <EdQuestionnaire q={questionnaire} />;
  if (questionnaire.type === "ALLERGY") return <AllergyQuestionnaire q={questionnaire} />;
  if (questionnaire.type === "SLEEP") return <SleepQuestionnaire q={questionnaire} />;
  if (questionnaire.type === "WEIGHT") return <WeightQuestionnaire q={questionnaire} />;
  if (questionnaire.type === "HAIR") return <HairQuestionnaire q={questionnaire} user={user} />;
  if (questionnaire.type === "JOY") return <JoyQuestionnaire q={questionnaire} user={user} />;

  return <UnderConstruction />;
};
