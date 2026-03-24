import { getShopifyGraphqlClient } from "./client.js";
import { PRODUCTS_QUERY, PRODUCT_QUERY } from "./queries.js";

export async function getProducts() {
  const client = getShopifyGraphqlClient();
  const response = await client.request(PRODUCTS_QUERY);

  return response.products.edges.map(({ node }) => {
    const firstVariantNode = node.variants.edges[0]?.node;

    return {
      id: node.id,
      title: node.title,
      handle: node.handle,
      vendor: node.vendor,
      description: node.description,
      image: node.featuredImage,
      price: node.priceRange.minVariantPrice,
      firstVariantId: firstVariantNode?.id ?? null
    };
  });
}

export async function getProduct(handle) {
  const client = getShopifyGraphqlClient();
  const response = await client.request(PRODUCT_QUERY, { handle });

  if (!response.product) {
    return null;
  }

  const firstVariantNode = response.product.variants.edges[0]?.node;

  return {
    id: response.product.id,
    title: response.product.title,
    handle: response.product.handle,
    description: response.product.description,
    image: response.product.featuredImage,
    price: response.product.priceRange.minVariantPrice,
    firstVariantId: firstVariantNode?.id ?? null
  };
}
