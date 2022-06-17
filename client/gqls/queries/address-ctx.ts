import { gql } from "@apollo/client";

export const GET_ADDRESS_CTX = gql`
  query {
    getAddressCtx {
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
