import { getShopifyGraphqlClient } from "./client.js";
import { CART_CREATE_MUTATION } from "./queries.js";

export async function createCheckout(variantId) {
  const client = getShopifyGraphqlClient();
  const response = await client.request(CART_CREATE_MUTATION, {
    variantId
  });

  const checkoutUserError = response.cartCreate.userErrors[0]?.message ?? null;

  if (checkoutUserError) {
    throw new Error(checkoutUserError);
  }

  const checkoutUrl = response.cartCreate.cart?.checkoutUrl;

  if (!checkoutUrl) {
    throw new Error("Shopify checkout URL is not available for this product.");
  }

  return checkoutUrl;
}
