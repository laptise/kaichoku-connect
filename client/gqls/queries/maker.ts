import { gql } from "@apollo/client";

export const GET_ALL_MAKERS_QUERY = gql`
  query {
    getAllMakers {
      id
      name
    }
  }
`;
