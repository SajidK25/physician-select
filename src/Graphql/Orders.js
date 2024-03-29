import gql from "graphql-tag";

export const ORDERLIST = gql`
  query orderList($status: String) {
    orders(status: $status) {
      id
      status
      new
      refills
      amount
      createdAt
      shipDate
      trackingNumber
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
        nextDelivery
        refillsRemaining
        product {
          productName
          display
          directions
          pillsPerDose
        }
        addon {
          productName
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
