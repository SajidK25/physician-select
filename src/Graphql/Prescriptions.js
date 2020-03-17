import gql from "graphql-tag";

export const APPROVE_PRESCRIPTION = gql`
  mutation approvePrescription($id: String!) {
    approvePrescription(id: $id) {
      message
    }
  }
`;

export const PRESCRIPTIONLIST_QUERY = gql`
  query prescriptionList($after: String) {
    prescriptions(after: $after) {
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

export const PHARMACYLIST_QUERY = gql`
  query orderList($after: String) {
    orders(after: $after, status: "PENDING") {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
        hasPreviousPage
      }
      edges {
        node {
          id
          new
          refills
          amount
          createdAt
          prescription {
            id
            status
            type
            createdAt
            approvedDate
            product {
              display
            }
            addon {
              display
            }
            timesPerMonth
            addonTimesPerMonth
            shippingInterval
            user {
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`;

export const GET_PRESCRIPTION = gql`
  query getPrescription($id: String!) {
    prescription(id: $id) {
      id
      status
      type
      createdAt
      visit {
        questionnaire
      }
      timesPerMonth
      addonTimesPerMonth
      shippingInterval
      amountDue
      product {
        productName
        display
      }
      addon {
        productName
        display
      }
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
