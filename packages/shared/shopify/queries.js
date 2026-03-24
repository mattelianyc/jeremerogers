import { gql } from "graphql-request";

export const PRODUCTS_QUERY = gql`
  query ProductsList {
    products(first: 24, sortKey: CREATED_AT, reverse: true) {
      edges {
        node {
          id
          title
          handle
          vendor
          description
          featuredImage {
            url
            altText
            width
            height
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
  }
`;

export const CART_CREATE_MUTATION = gql`
  mutation CartCreate($variantId: ID!) {
    cartCreate(
      input: { lines: [{ merchandiseId: $variantId, quantity: 1 }] }
    ) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
