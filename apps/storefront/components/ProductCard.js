"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { formatCurrency } from "@jereme/shared/formatting";

export function ProductCard({
  product,
  isSelected = false,
  onSelect,
  surfaceLayoutId
}) {
  const productCategory = product.vendor || "Ready to Wear";
  const productPrice = formatCurrency(product.price.amount, product.price.currencyCode);

  return (
    <article>
      <motion.button
        layoutId={surfaceLayoutId}
        type="button"
        onClick={onSelect}
        aria-expanded={isSelected}
        aria-label={`Open ${product.title} details`}
        className="group block w-full text-left focus:outline-none"
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {product.image?.url ? (
            <Image
              src={product.image.url}
              alt={product.image.altText || product.title}
              fill
              sizes="(min-width: 1024px) 24vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out lg:group-hover:scale-[1.035] lg:group-focus-visible:scale-[1.035]"
              priority={false}
            />
          ) : null}

          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 ease-out lg:group-hover:bg-black/8 lg:group-focus-visible:bg-black/8" />

          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <div className="relative overflow-hidden border border-black/10 bg-[#e9dcc0]/95 px-3.5 py-3 text-black shadow-[0_16px_40px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-all duration-500 ease-out lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100">
              <div className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#8b1e2d]/45 to-transparent" />
              <div className="absolute -right-6 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#8b1e2d]/10 blur-2xl transition-opacity duration-500 ease-out lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100" />

              <p className="text-[10px] uppercase tracking-[0.28em] text-black/52">
                {productCategory}
              </p>
              <h2 className="mt-2 text-sm uppercase tracking-[0.14em] text-black">
                {product.title}
              </h2>

              <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-sm text-black">{productPrice}</p>
                <span className="relative inline-flex items-center pb-1 text-[10px] uppercase tracking-[0.28em] text-[#7f1d1d] lg:translate-x-[-0.2rem] lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-out lg:group-hover:translate-x-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-x-0 lg:group-focus-visible:opacity-100">
                  View product
                  <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-[#8b1e2d]/55 lg:scale-x-0 lg:transition-transform lg:duration-500 lg:ease-out lg:group-hover:scale-x-100 lg:group-focus-visible:scale-x-100" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    </article>
  );
}
