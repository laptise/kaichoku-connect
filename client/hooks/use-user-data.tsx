import { gql, useQuery } from "@apollo/client";
import { JWTPayload, User } from "@entities";
import { useEffect, useState } from "react";

const GET_PROFILE = gql`
  query ($id: String!) {
    getUserById(id: $id) {
      displayName
      id
      email
      imgUrl
    }
  }
`;

export const useUserData = (payload: JWTPayload) => {
  const { data } = useQuery<NestedQuery<"getUserById", User>>(GET_PROFILE, { variables: { id: payload?.userId } });
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    if (data?.getUserById) {
      const user = data.getUserById;
      setUser(user);
    } else {
      setUser(null);
    }
  }, [data]);
  return user;
};
