import { gql } from "@apollo/client";

export const ADD_NEW_REQUEST = gql`
  mutation addNewTradeRequest(
    $ownerId: String!
    $title: String!
    $content: String!
    $minor: NewMinorCategoryInput!
    $majorId: Float!
    $maker: NewMakerMstInput!
    $product: NewProductMstInput!
    $targetCountryCode: String!
  ) {
    addNewTradeRequest(
      data: {
        title: $title
        content: $content
        ownerId: $ownerId
        minorCategory: $minor
        majorCategoryId: $majorId
        maker: $maker
        product: $product
        targetCountryCode: $targetCountryCode
      }
    ) {
      id
    }
  }
`;
