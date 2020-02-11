import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { ShowQuestionaire, Loading, PatientInfo, PatientMessages } from "./";

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
        }
      }
    }
  }
`;

export const VisitDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_VISIT, {
    variables: { id: id }
  });

  if (loading) return <Loading />;
  if (error) return <p>ERROR!</p>;
  if (!data) return <p>Not Found!</p>;
  console.log("Data:", data);

  return (
    <>
      <PatientInfo visit={data.visit} />
      <ShowQuestionaire questionnaire={data.visit.questionnaire} />
      <PatientMessages visit={data.visit} />
    </>
  );
};
