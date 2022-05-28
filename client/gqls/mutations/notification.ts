import { gql } from "@apollo/client";
import client from "../../apollo-client";

export const ADD_NEW_NOTIFICATION = gql`
  mutation addNewNotification($targetUserId: String!, $msg: String!, $actionLink: String) {
    addNewNotification(data: { targetUserId: $targetUserId, msg: $msg, actionLink: $actionLink }) {
      id
    }
  }
`;

export const makeNotification = async (targetUserId: string, msg: string, actionLink = "") => {
  await client.mutate({ mutation: ADD_NEW_NOTIFICATION, variables: { targetUserId, msg, actionLink } });
};
