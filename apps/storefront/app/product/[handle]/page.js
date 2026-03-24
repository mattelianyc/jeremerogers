import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@jereme/ui";
import { formatCurrency } from "@jereme/shared/formatting";
import { getProduct } from "@/lib/shopify";
import { createCheckoutAction } from "./actions/createCheckout";

export async function generateMetadata({ params }) {
  const product = await getProduct(params.handle);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.title} | ALMO SEBASTIAN`,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }) {
  const product = await getProduct(params.handle);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-10 px-5 pb-24 pt-6 md:px-10 lg:grid-cols-12 lg:gap-14">
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 lg:col-span-7">
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.image.altText || product.title}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="lg:col-span-5 lg:pt-2">
        <div className="max-w-md space-y-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            Product
          </p>
          <h1 className="text-2xl uppercase md:text-3xl">{product.title}</h1>
          <p className="text-lg">
            {formatCurrency(product.price.amount, product.price.currencyCode)}
          </p>

          <p className="max-w-prose text-sm leading-7 text-neutral-700">
            {product.description}
          </p>

          <form action={createCheckoutAction} className="pt-4">
            <input type="hidden" name="variantId" value={product.firstVariantId ?? ""} />
            <Button type="submit" disabled={!product.firstVariantId}>
              Add to Cart
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
