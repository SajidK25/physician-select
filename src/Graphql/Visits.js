import gql from "graphql-tag";

export const VISITLIST_QUERY = gql`
  query visitList($after: String) {
    visits(after: $after) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
      }
      edges {
        node {
          id
          status
          type
          createdAt
          user {
            firstName
            lastName
          }
        }
      }
    }
  }
`;
