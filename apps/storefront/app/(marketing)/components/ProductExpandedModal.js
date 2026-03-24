"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button, IconButton } from "@jereme/ui";
import { formatCurrency } from "@jereme/shared/formatting";
import { createCheckoutAction } from "@/app/product/[handle]/actions/createCheckout";
import styles from "./ProductExpandedModal.module.css";

const SURFACE_TRANSITION = {
  duration: 0.5,
  ease: [0.2, 0.7, 0.2, 1]
};

export function ProductExpandedModal({ product, onClose, surfaceLayoutId }) {
  const productCategory = product.vendor || "Ready to Wear";
  const productPrice = formatCurrency(product.price.amount, product.price.currencyCode);
  const productDescription =
    product.description?.trim() || "Available now in the latest collection.";

  return (
    <div className={styles.perspective}>
      <motion.div
        layoutId={surfaceLayoutId}
        className={styles.cube}
        initial={{ opacity: 0.88 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0.9 }}
        transition={SURFACE_TRANSITION}
      >
        <div className={styles.cubeTop} aria-hidden="true" />
        <div className={styles.cubeRight} aria-hidden="true" />

        <div className={styles.panel}>
          <div className={styles.accentLine} aria-hidden="true" />

          <div className={styles.headerRow}>
            <div className={styles.headerCopy}>
              <p className={styles.brandSignature}>ALMO SEBASTIAN</p>
              <p className={styles.eyebrow}>{productCategory}</p>
            </div>
            <IconButton
              ariaLabel={`Close ${product.title} details`}
              onClick={onClose}
              className={styles.closeButton}
            >
              <span aria-hidden="true" className={styles.closeGlyph}>
                ✕
              </span>
            </IconButton>
          </div>

          <div className={styles.content}>
            <div className={styles.mediaColumn}>
              <div className={styles.imageFrame}>
                {product.image?.url ? (
                  <Image
                    src={product.image.url}
                    alt={product.image.altText || product.title}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className={styles.image}
                    priority={false}
                  />
                ) : null}
              </div>
            </div>

            <div className={styles.copyColumn}>
              <div className={styles.copyBody}>
                <div className={styles.titleBlock}>
                  <h3 className={styles.title}>{product.title}</h3>
                  <div className={styles.titleUnderline} aria-hidden="true" />
                  <p className={styles.price}>{productPrice}</p>
                </div>

                <p className={styles.description}>{productDescription}</p>
              </div>

              <div className={styles.purchasePanel}>
                <form action={createCheckoutAction} className={styles.form}>
                  <input
                    type="hidden"
                    name="variantId"
                    value={product.firstVariantId ?? ""}
                  />
                  <Button
                    type="submit"
                    disabled={!product.firstVariantId}
                    className={styles.addToCartButton}
                  >
                    Add to Cart
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
