"use client";

import { AnimatePresence, motion } from "framer-motion";
import styles from "./HeroTerminalTransitionOverlay.module.css";

const TERMINAL_LINE_ANIMATION_DURATION = 0.26;
const TERMINAL_LINE_ANIMATION_STAGGER = 0.075;
const TERMINAL_OVERLAY_FADE_OUT_DELAY = 0.18;
const TERMINAL_OVERLAY_FADE_OUT_DURATION = 0.34;

const TERMINAL_DUMP_LINES = [
  "J3R3M3:$ ./storefront handoff --surface featured --target products",
  "[boot] resolving route group .................... app/(marketing)",
  "[media] attaching background stream ............. /assets/videos/bg.mp4",
  "[motion] forcing wordmark exit .................. complete",
  "[catalog] requesting featured collection ........ storefront.products",
  "[catalog] product nodes received ................ 03",
  "[product:01] title=almo sebastian t shirt ....... price=$30.00",
  "[product:02] title=goal digger t shirt .......... price=$33.00",
  "[product:03] title=cult hoodie .................. price=$55.55",
  "[layout] resolving viewport handoff ............. #marketing-products-section",
  "[session] switching from hero to products ....... done"
];

export function HeroTerminalTransitionOverlay({
  isVisible,
  prefersReducedMotion
}) {
  const finalLineRevealDelay =
    (TERMINAL_DUMP_LINES.length - 1) * TERMINAL_LINE_ANIMATION_STAGGER;
  const overlayFadeOutStartTime =
    finalLineRevealDelay +
    TERMINAL_LINE_ANIMATION_DURATION +
    TERMINAL_OVERLAY_FADE_OUT_DELAY;

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className={styles.overlay}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: [0, 1, 1, 0] }
          }
          exit={{ opacity: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0.12 }
              : {
                  duration: overlayFadeOutStartTime + TERMINAL_OVERLAY_FADE_OUT_DURATION,
                  times: [
                    0,
                    0.08,
                    overlayFadeOutStartTime /
                      (overlayFadeOutStartTime + TERMINAL_OVERLAY_FADE_OUT_DURATION),
                    1
                  ],
                  ease: "linear"
                }
          }
        >
          <div className={styles.scanlines} aria-hidden="true" />
          <div className={styles.content}>
            {TERMINAL_DUMP_LINES.map((line, index) => (
              <motion.p
                key={line}
                className={styles.line}
                initial={
                  prefersReducedMotion ? false : { opacity: 0, y: 10, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: prefersReducedMotion ? 0.1 : TERMINAL_LINE_ANIMATION_DURATION,
                  delay: prefersReducedMotion ? 0 : index * TERMINAL_LINE_ANIMATION_STAGGER,
                  ease: [0.2, 0.8, 0.2, 1]
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
