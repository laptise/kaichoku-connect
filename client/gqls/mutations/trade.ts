import { gql } from "@apollo/client";

export const NEW_REQUEST_CATCH = gql`
  mutation ($tradeRequestId: Float!, $msg: String!) {
    newRequestCatch(data: { tradeRequestId: $tradeRequestId, msg: $msg }) {
      id
      catcherId
      msg
    }
  }
`;
