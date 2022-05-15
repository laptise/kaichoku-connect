import { gql } from "@apollo/client";

export const GET_ALL_MAJOR_CATEGORY_MSTS = gql`
  query {
    getMajorCategoryMsts {
      id
      name
    }
  }
`;
