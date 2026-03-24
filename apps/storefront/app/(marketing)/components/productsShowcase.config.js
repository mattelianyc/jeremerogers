export const productsShowcaseViewport = {
  once: true,
  amount: 0.12
};

export const PRODUCTS_SHOWCASE_CARD_SEQUENCE_START = 0.08;
export const PRODUCTS_SHOWCASE_CARD_SEQUENCE_END = 0.96;

export const productsShowcaseHeaderVariants = {
  hidden: {
    opacity: 0,
    y: 26
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.2, 0.7, 0.2, 1]
    }
  }
};

export const productsShowcaseCardVariants = {
  hidden: {
    opacity: 0,
    y: 34
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.7, 0.2, 1]
    }
  }
};

export function getProductsShowcaseCardRevealRange(cardIndex, totalCards) {
  const totalSequenceRange =
    PRODUCTS_SHOWCASE_CARD_SEQUENCE_END - PRODUCTS_SHOWCASE_CARD_SEQUENCE_START;
  const stepSize = totalCards > 0 ? totalSequenceRange / totalCards : totalSequenceRange;
  const revealStart = PRODUCTS_SHOWCASE_CARD_SEQUENCE_START + stepSize * cardIndex;
  const revealEnd = Math.min(
    revealStart + stepSize * 0.55,
    PRODUCTS_SHOWCASE_CARD_SEQUENCE_END
  );

  return {
    revealStart,
    revealEnd
  };
}
