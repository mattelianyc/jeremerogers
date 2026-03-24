const REQUIRED_ENVIRONMENT_KEYS = [
  "NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN",
  "NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN"
];

export function getShopifyEnvironment() {
  const missingKeys = REQUIRED_ENVIRONMENT_KEYS.filter(
    (key) => !process.env[key] || process.env[key].trim() === ""
  );

  if (missingKeys.length > 0) {
    throw new Error(
      `Missing Shopify environment variables: ${missingKeys.join(", ")}`
    );
  }

  return {
    storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    storefrontToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
  };
}
