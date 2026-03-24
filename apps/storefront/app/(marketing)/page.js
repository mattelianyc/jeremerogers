import { getProducts } from "@/lib/shopify";
import { BrandHeroParallax } from "./components/BrandHeroParallax";
import { ProductsShowcaseSection } from "./components/ProductsShowcaseSection";

export const metadata = {
  title: "ALMO SEBASTIAN | New Arrivals",
  description: "Discover curated luxury fashion essentials."
};

export default async function MarketingHomePage() {
  const products = await getProducts();

  return (
    <>
      <BrandHeroParallax />
      <ProductsShowcaseSection products={products} />
    </>
  );
}
