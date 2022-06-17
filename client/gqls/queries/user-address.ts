import { gql } from "@apollo/client";

export const GET_USER_ADDRESS_BY_USER_ID = gql`
  query {
    getUserAddressByUserId(userId: "laptise") {
      userId
      zipCode
      ctx1
      ctx2
      ctx3
      ctx4
      ctx5
      ctx6
      ctx7
      ctx8
      ctx9
    }
  }
`;

export const GET_SELF_ADDRESS = gql`
  query {
    getSelfAddress {
      zipCode
      ctx1
      ctx2
      ctx3
      ctx4
      ctx5
      ctx6
      ctx7
      ctx8
      ctx9
    }
  }
`;
