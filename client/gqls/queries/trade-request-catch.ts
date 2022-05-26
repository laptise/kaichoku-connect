import { gql } from "@apollo/client";

const GET_PENDING_REQUEST_CATCH_BY_TRADE_ID = gql`
  query ($tradeRequestId: Float!) {
    getPendingRequestCatchByTradeId(tradeRequestId: $tradeRequestId) {
      id
      createdAt
    }
  }
`;

export const GET_PENDING_REQUEST_CATCH_BY__ID = gql`
  query getPendingRequestCatchById($id: Float!) {
    getPendingRequestCatchById(requestCatchId: $id) {
      id
      catcherId
      tradeRequestId
      msg
      createdAt
      catcher {
        displayName
        imgUrl
      }
    }
  }
`;
