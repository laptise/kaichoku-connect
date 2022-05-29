import { gql } from "@apollo/client";

export const GET_TRADE_REQUESTS_BY_ID = gql`
  query getTradesByUserId($userId: String!) {
    getTradesByUserId(userId: $userId) {
      id
      catcherId
      owner {
        displayName
      }
      tradeRequest {
        createdAt
        title
      }
      createdAt
    }
  }
`;

export const GET_TRADES_WITH_QUERY = gql`
  query getTrades($userId: String!, $userType: UserType!) {
    getTrades(q: { userType: $userType, userId: $userId }) {
      pageInfo {
        totalCount
      }
      nodes {
        id
        request {
          title
        }
        owner {
          displayName
        }
        catcher {
          displayName
        }
      }
    }
  }
`;

export const GET_TRADE_BY_ID = gql`
  query getTradeById($id: Float!) {
    getTradeById(id: $id) {
      id
      createdAt
      catcher {
        id
        displayName
      }
      owner {
        displayName
        id
      }
      requestCatch {
        createdAt
      }
      tradeRequest {
        title
        createdAt
        maker {
          name
        }
        product {
          name
        }
        majorCategory {
          name
        }
        minorCategory {
          name
        }
      }
    }
  }
`;
