import { gql } from "@apollo/client";

export const SUBSCRIBE_CHAT_ROOM = gql`
  subscription ($roomId: Float!) {
    newMessage(roomId: $roomId) {
      id
      content
      createdAt
      createdBy
      author {
        displayName
        imgUrl
      }
    }
  }
`;
