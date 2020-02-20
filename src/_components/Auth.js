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

export const useAuth = () => {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

  return { data, loading, error };
};
