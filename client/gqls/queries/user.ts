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
        accountName
        bank {
          imgUrl
          name
        }
      }
      addressInfo {
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
        countryCode
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
