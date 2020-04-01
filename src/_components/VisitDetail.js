import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { ShowQuestionaire, Loading, PatientInfo, PatientMessages } from "./";
import { GET_PRESCRIPTION } from "../Graphql";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row"
  }
}));

export const VisitDetail = () => {
  const { id } = useParams();
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_PRESCRIPTION, {
    variables: { id: id }
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR!</p>;
  if (!data) return <p>Not Found!</p>;

  return (
    <div className={classes.container}>
      <PatientInfo prescription={data.prescription} />
      <ShowQuestionaire questionnaire={data.prescription.visit.questionnaire} />
      <PatientMessages prescription={data.prescription} />
    </div>
  );
};
