import { gql } from "@apollo/client";

export const ADD_NEW_CHAT_MESSAGE = gql`
  mutation addNewChatMessage($roomId: Float!, $content: String!) {
    addNewChatMessage(data: { roomId: $roomId, type: message, content: $content }) {
      id
      content
      createdAt
    }
  }
`;
