import gql from "graphql-tag";

export const PROCESS_ORDERS = gql`
  mutation processOrders($idList: [String]!) {
    processOrders(idList: $idList) {
      message
    }
  }
`;

export const SHIP_ORDERS = gql`
  mutation shipOrders($idList: [String]!) {
    shipOrders(idList: $idList) {
      message
    }
  }
`;
