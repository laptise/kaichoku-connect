import { gql } from "@apollo/client";

/**取引コメント追加 */
export const ADD_COMMENT = gql`
  mutation ($tradeRequestId: Float!, $content: String!) {
    addComment(data: { tradeRequestId: $tradeRequestId, content: $content }) {
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
  }
`;
