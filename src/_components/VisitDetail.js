import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { ShowQuestionaire, Loading, PatientInfo, PatientMessages } from "./";
import { GET_PRESCRIPTION } from "../Graphql";

const GET_VISIT = gql`
  query getVisit($id: String!) {
    visit(id: $id) {
      id
      status
      type
      createdAt
      questionnaire
      user {
        firstName
        lastName
        birthDate
        photoId
        addresses {
          active
          addressOne
          city
          state
          telephone
          zipcode
        }
      }
    }
  }
`;

export const VisitDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PRESCRIPTION, {
    variables: { id: id }
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR!</p>;
  if (!data) return <p>Not Found!</p>;

  return (
    <>
      <PatientInfo prescription={data.prescription} />
      <ShowQuestionaire questionnaire={data.prescription.visit.questionnaire} />
      <PatientMessages prescription={data.prescription} />
    </>
  );
};
