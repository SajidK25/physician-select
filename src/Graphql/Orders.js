import gql from "graphql-tag";

export const ORDERLIST = gql`
  query orderList($status: String) {
    orders(status: $status) {
      id
      new
      refills
      amount
      createdAt
      user {
        firstName
        lastName
        birthDate
      }
      addressOne
      addressTwo
      city
      state
      zipcode
      telephone
      email
      prescription {
        id
        status
        type
        createdAt
        approvedDate
        startDate
        expireDate
        refillsRemaining
        product {
          display
          directions
          pillsPerDose
        }
        addon {
          display
          directions
          pillsPerDose
        }
        timesPerMonth
        addonTimesPerMonth
        shippingInterval
      }
    }
  }
`;

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
