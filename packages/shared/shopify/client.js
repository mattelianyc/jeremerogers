import { GraphQLClient } from "graphql-request";
import { getShopifyEnvironment } from "./env.js";

export function getShopifyGraphqlClient() {
  const { storeDomain, storefrontToken } = getShopifyEnvironment();
  const endpoint = `https://${storeDomain}/api/2024-10/graphql.json`;

  return new GraphQLClient(endpoint, {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontToken,
      "Content-Type": "application/json"
    }
  });
}
