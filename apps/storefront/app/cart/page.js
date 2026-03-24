import Link from "next/link";

export const metadata = {
  title: "Cart | ALMO SEBASTIAN"
};

export default function CartPage() {
  return (
    <section className="mx-auto w-full max-w-[900px] px-5 pb-24 pt-16 md:px-10">
      <h1 className="text-2xl uppercase">Cart</h1>
      <p className="mt-6 max-w-prose text-sm leading-7 text-neutral-700">
        This minimalist storefront routes directly to Shopify checkout from product pages.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-black px-8 py-3 text-xs uppercase tracking-[0.18em]"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
