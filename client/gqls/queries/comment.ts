import { gql } from "@apollo/client";

/**取引コメント取得
 *
 * requestId:取引ID
 *
 * skip?:何件目から
 *
 * take?:何件取得
 */
export const GET_COMMENTS = gql`
  query getComments($requestId: Float!, $skip: Float, $take: Float) {
    getComments(condition: { requestId: $requestId, skip: $skip, take: $take }) {
      nodes {
        id
        content
        repliesTo
        isSecret
        createdAt
        author {
          displayName
          id
          imgUrl
        }
      }
      pageInfo {
        hasNextPage
        totalCount
      }
    }
  }
`;
