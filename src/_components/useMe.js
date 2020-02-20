import React from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";

const CURRENT_USER_QUERY = gql`
  query {
    physician {
      id
      email
      firstName
      lastName
    }
  }
`;

export const useMe = () => {
  const { data } = useQuery(CURRENT_USER_QUERY);

  if (!data) return null;

  return data.physician;
};
