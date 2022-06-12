import { gql } from "@apollo/client";

export const GET_BANKS_BY_USER_LANG = gql`
  query {
    getBanksByUserLang {
      name
      swiftCode
      imgUrl
    }
  }
`;
