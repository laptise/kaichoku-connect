import { gql } from "@apollo/client";
import client from "../../apollo-client";

export const ADD_NEW_NOTIFICATION = gql`
  mutation ($targetUserId: String!, $msg: String!) {
    addNewNotification(data: { targetUserId: $targetUserId, msg: $msg }) {
      id
    }
  }
`;

export const makeNotification = async (targetUserId: string, msg: string) => {
  await client.mutate({ mutation: ADD_NEW_NOTIFICATION, variables: { targetUserId, msg } });
};
