import gql from "graphql-tag";

export const APPROVE_PRESCRIPTION = gql`
  mutation approvePrescription($id: String!) {
    approvePrescription(id: $id) {
      message
    }
  }
`;

export const REMINDERS_TO_GO = gql`
  query {
    remindersToGo {
      id
      status
    }
  }
`;

export const REFILLS_TO_PROCESS = gql`
  query {
    refillsToProcess {
      id
      status
    }
  }
`;

export const DENY_PRESCRIPTION = gql`
  mutation denyPrescription($id: String!) {
    denyPrescription(id: $id) {
      message
    }
  }
`;

export const SETNEXTDELIVERYDATE = gql`
  mutation setNextDeliveryDate {
    setNextDeliveryDate {
      message
    }
  }
`;

export const PROCESS_REFILLS = gql`
  mutation {
    processRefills
  }
`;

export const SENDREMINDERS = gql`
  mutation sendReminders {
    sendReminders
  }
`;

export const PENDING_PRESCRIPTIONS = gql`
  query {
    pendingPrescriptions {
      id
      status
      type
      createdAt
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
      user {
        firstName
        lastName
      }
    }
  }
`;

export const VISITLIST_QUERY = gql`
  query visitList($after: String) {
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
  query orderList($status: String, $after: String) {
    orders(after: $after, status: $status) {
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
          user {
            firstName
            lastName
            birthDate
            gender
          }
          address {
            addressOne
            addressTwo
            city
            state
            zipcode
          }
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
              display
              productName
              directions
              pillsPerDose
            }
            timesPerMonth
            addonTimesPerMonth
            shippingInterval
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
      nextDelivery
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
        directions
        pillsPerDose
      }
      user {
        firstName
        lastName
        birthDate
        photoId
        gender
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
