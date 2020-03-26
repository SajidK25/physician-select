import gql from "graphql-tag";

export const CREATE_MESSAGE = gql`
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      message
    }
  }
`;
