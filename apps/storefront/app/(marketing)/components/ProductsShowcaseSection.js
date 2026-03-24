"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AnimatedProductCard } from "./AnimatedProductCard";
import styles from "./ProductsShowcaseSection.module.css";
import {
  productsShowcaseHeaderVariants,
  productsShowcaseViewport
} from "./productsShowcase.config";

export function ProductsShowcaseSection({ products }) {
  const sectionReference = useRef(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { scrollYProgress } = useScroll({
    target: sectionReference,
    offset: ["start 85%", "end 45%"]
  });

  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.key === "Escape") {
        setSelectedProductId(null);
      }
    }

    window.addEventListener("keydown", handleEscapeKey);
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const visibleProducts = selectedProductId
    ? products.filter((product) => product.id === selectedProductId)
    : products;

  return (
    <section
      id="marketing-products-section"
      ref={sectionReference}
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <motion.header
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={productsShowcaseViewport}
          variants={productsShowcaseHeaderVariants}
        >
          <p className={styles.eyebrow}>Featured collection</p>
          <h2 className={styles.title}>Products</h2>
        </motion.header>

        <ul className={styles.grid}>
          {visibleProducts.map((product, index) => (
            <AnimatedProductCard
              key={product.id}
              product={product}
              index={index}
              totalProducts={visibleProducts.length}
              scrollProgress={scrollYProgress}
              isSelected={selectedProductId === product.id}
              onSelect={() => setSelectedProductId(product.id)}
              onClose={() => setSelectedProductId(null)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
