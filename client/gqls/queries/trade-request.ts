import { gql } from "@apollo/client";

/**取引リクエスト情報を取得
 *
 * id:取引リクエストID
 */
export const GET_TRADE_REQUEST_BY_ID = gql`
  query getTradeRequestById($id: Float!) {
    getTradeRequestById(id: $id) {
      id
      title
      content
      createdAt
      count
      targetCountryCode
      owner {
        displayName
        id
        imgUrl
      }
      majorCategory {
        id
        name
      }
      minorCategory {
        id
        name
      }
      images {
        title
        content
        url
        id
      }
      maker {
        name
      }
      product {
        name
      }
    }
  }
`;
