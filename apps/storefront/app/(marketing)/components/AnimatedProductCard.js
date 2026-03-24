"use client";

import { AnimatePresence, motion, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductExpandedModal } from "./ProductExpandedModal";
import styles from "./ProductsShowcaseSection.module.css";
import { getProductsShowcaseCardRevealRange } from "./productsShowcase.config";

export function AnimatedProductCard({
  product,
  index,
  totalProducts,
  scrollProgress,
  isSelected,
  onSelect,
  onClose
}) {
  const { revealStart, revealEnd } = getProductsShowcaseCardRevealRange(index, totalProducts);
  const [hasCardRevealed, setHasCardRevealed] = useState(
    () => scrollProgress.get() >= revealEnd
  );
  const opacity = useTransform(scrollProgress, [revealStart, revealEnd], [0, 1]);
  const translateY = useTransform(scrollProgress, [revealStart, revealEnd], [34, 0]);
  const surfaceLayoutId = `product-surface-${product.id}`;

  useMotionValueEvent(scrollProgress, "change", (latestProgress) => {
    if (!hasCardRevealed && latestProgress >= revealEnd) {
      setHasCardRevealed(true);
    }
  });

  return (
    <motion.li
      layout
      className={`${styles.cardItem} ${isSelected ? styles.cardItemExpanded : ""}`}
      transition={{ duration: 0.62, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        opacity: isSelected || hasCardRevealed ? 1 : opacity,
        y: isSelected || hasCardRevealed ? 0 : translateY
      }}
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
