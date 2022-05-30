import { gql } from "@apollo/client";

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages($roomId: Float!) {
    getChatMessages(condition: { roomId: $roomId }) {
      id
      content
      createdAt
      createdBy
    }
  }
`;
