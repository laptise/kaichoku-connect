import { gql } from "@apollo/client";

export const GET_INFO_FOR_DASHBOARD = gql`
  query ($userId: String!) {
    getUserById(id: $userId) {
      id
      bankInfo {
        userId
        accountNo
        accountType
        branchCode
        swiftCode
        bank {
          name
        }
      }
      requestingTrades {
        id
        title
        majorCategory {
          name
        }
        minorCategory {
          name
        }
        maker {
          name
        }
        product {
          name
        }
        pendingCatches {
          id
          createdAt
          msg
          catcher {
            id
            displayName
            imgUrl
          }
        }
        comments {
          id
        }
      }
    }
  }
`;
