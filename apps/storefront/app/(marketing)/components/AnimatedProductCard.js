"use client";

import { AnimatePresence, motion, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductExpandedModal } from "./ProductExpandedModal";
import styles from "./ProductsShowcaseSection.module.css";
import {
  getProductsShowcaseCardRevealRange,
  productsShowcaseCardVariants
} from "./productsShowcase.config";

export function AnimatedProductCard({
  product,
  index,
  totalProducts,
  scrollProgress,
  isSelected,
  onSelect,
  onClose
}) {
  const { revealStart } = getProductsShowcaseCardRevealRange(index, totalProducts);
  const [hasCardRevealStarted, setHasCardRevealStarted] = useState(
    () => scrollProgress.get() >= revealStart
  );
  const surfaceLayoutId = `product-surface-${product.id}`;

  useMotionValueEvent(scrollProgress, "change", (latestProgress) => {
    if (!hasCardRevealStarted && latestProgress >= revealStart) {
      setHasCardRevealStarted(true);
    }
  });

  return (
    <motion.li
      layout
      initial={false}
      animate={isSelected || hasCardRevealStarted ? "visible" : "hidden"}
      variants={productsShowcaseCardVariants}
      className={`${styles.cardItem} ${isSelected ? styles.cardItemExpanded : ""}`}
      transition={{ duration: 0.62, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <AnimatePresence initial={false}>
        {isSelected ? (
          <ProductExpandedModal
            product={product}
            onClose={onClose}
            surfaceLayoutId={surfaceLayoutId}
          />
        ) : (
          <ProductCard
            product={product}
            isSelected={isSelected}
            onSelect={onSelect}
            surfaceLayoutId={surfaceLayoutId}
          />
        )}
      </AnimatePresence>
    </motion.li>
  );
}
