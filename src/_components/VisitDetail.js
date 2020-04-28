import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { ShowQuestionnaire, Loading, PatientInfo, PatientMessages } from "./";
import { GET_PRESCRIPTION } from "../Graphql";

const useStyles = makeStyles((theme) => ({
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    height: "calc(90vh - 50px)",
  },
  sectionContainer: {
    flex: 1,
    flexWrap: "nowrap",
    padding: "6px 2px",
    display: "flex",
    flexDirection: "column",
  },
}));

export const VisitDetail = () => {
  const { id } = useParams();
  const classes = useStyles();

  const { data, loading, error } = useQuery(GET_PRESCRIPTION, {
    variables: { id: id },
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR!</p>;
  if (!data) return <p>Not Found!</p>;

  return (
    <div className={classes.infoContainer}>
      <div className={classes.sectionContainer}>
        <PatientInfo prescription={data.prescription} />
      </div>
      <div className={classes.sectionContainer}>
        <ShowQuestionnaire
          questionnaire={data.prescription.visit.questionnaire}
        />
      </div>
      <div className={classes.sectionContainer}>
        <PatientMessages prescription={data.prescription} />
      </div>
    </div>
  );
};
