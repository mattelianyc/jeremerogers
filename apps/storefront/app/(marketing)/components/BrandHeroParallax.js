"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HeroTerminalTransitionOverlay } from "./HeroTerminalTransitionOverlay";
import styles from "./BrandHeroParallax.module.css";
import { useHeroTerminalTyping } from "./useHeroTerminalTyping";
import {
  BRAND_NAME,
  CATEGORY_FADE_OUT_PROGRESS,
  HERO_ENTER_TRANSITION_COMPLETE_DELAY_MS,
  HERO_ENTER_WORDMARK_COMPLETION_DURATION,
  HERO_ENTER_TRANSITION_SCROLL_DELAY_MS,
  HERO_ENTER_TRANSITION_TRIGGER_SCROLL_PROGRESS,
  HERO_BLACK_PANEL_INITIAL_BOTTOM_COVERAGE,
  HERO_BLACK_PANEL_INITIAL_TOP_COVERAGE,
  HERO_CONTENT_BLUR_AMOUNT,
  HERO_CONTENT_REVEAL_DELAY,
  HERO_CONTENT_REVEAL_DURATION,
  HERO_MEDIA_SETTLE_DURATION,
  HERO_OVERLAY_COVER_PROGRESS,
  HERO_OVERLAY_REVEAL_DELAY,
  HERO_OVERLAY_REVEAL_DURATION,
  HERO_TERMINAL_PROMPT,
  HERO_TERMINAL_TYPING_START_DELAY_MS,
  HERO_TERMINAL_TYPING_STEP_DURATION_MS,
  HERO_VIDEO_FADE_OUT_PROGRESS,
  HERO_VIDEO_REVEAL_FALLBACK_DELAY_MS,
  CATEGORY_WORDS,
  MINIMUM_OUTRO_LIFT_VIEWPORT_FACTOR,
  OUTRO_SCROLL_DISTANCE_FACTOR,
  getInverseStaggerDelay,
  getMovementDistance
} from "./brandHeroParallax.config";

export function BrandHeroParallax() {
  const heroContainerReference = useRef(null);
  const heroVideoReference = useRef(null);
  const enterTransitionTimeoutReferences = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(900);
  const [isHeroRevealReady, setIsHeroRevealReady] = useState(false);
  const [enterTransitionPhase, setEnterTransitionPhase] = useState("idle");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    function updateViewportHeight() {
      setViewportHeight(window.innerHeight);
    }

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  useEffect(() => {
    function updateProgress() {
      if (!heroContainerReference.current) {
        return;
      }

      const heroTopOffset = heroContainerReference.current.offsetTop;
      const scrollWithinHero = Math.max(window.scrollY - heroTopOffset, 0);
      const animationDistance = window.innerHeight * OUTRO_SCROLL_DISTANCE_FACTOR;
      const nextProgress = Math.min(scrollWithinHero / animationDistance, 1);
      setScrollProgress(nextProgress);
    }

    let animationFrameId = null;
    function handleScrollOrResize() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    }

    updateProgress();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  useEffect(() => {
    const heroVideoElement = heroVideoReference.current;

    if (!heroVideoElement) {
      setIsHeroRevealReady(true);
      return undefined;
    }

    function markHeroAsReady() {
      setIsHeroRevealReady(true);
    }

    if (heroVideoElement.readyState >= 2) {
      markHeroAsReady();
      return undefined;
    }

    heroVideoElement.addEventListener("loadeddata", markHeroAsReady, { once: true });
    heroVideoElement.addEventListener("error", markHeroAsReady, { once: true });

    const fallbackTimeoutId = window.setTimeout(
      markHeroAsReady,
      HERO_VIDEO_REVEAL_FALLBACK_DELAY_MS
    );

    return () => {
      window.clearTimeout(fallbackTimeoutId);
      heroVideoElement.removeEventListener("loadeddata", markHeroAsReady);
      heroVideoElement.removeEventListener("error", markHeroAsReady);
    };
  }, []);

  useEffect(() => {
    return () => {
      enterTransitionTimeoutReferences.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    };
  }, []);

  const brandCharacters = BRAND_NAME.split("");
  const isEnterWordmarkCompletionActive = enterTransitionPhase === "wordmark-completing";
  const isEnterTransitionOverlayVisible = enterTransitionPhase === "terminal-overlay";
  const isEnterTransitionActive = enterTransitionPhase !== "idle";
  const effectiveScrollProgress = isEnterTransitionActive ? 1 : scrollProgress;
  const categoryOpacity =
    Math.max(0, 1 - effectiveScrollProgress / CATEGORY_FADE_OUT_PROGRESS) *
    (isHeroRevealReady && !isEnterTransitionActive ? 1 : 0);
  const videoFadeOutProgress = Math.min(
    effectiveScrollProgress / HERO_VIDEO_FADE_OUT_PROGRESS,
    1
  );
  const heroVideoOpacity = 1 - videoFadeOutProgress;
  const heroOverlayOpacity = isHeroRevealReady ? 1 : 0;
  const shouldReduceMotion = Boolean(prefersReducedMotion);
  const overlayCoverProgress = Math.min(
    effectiveScrollProgress / HERO_OVERLAY_COVER_PROGRESS,
    1
  );
  const blackPanelTopCoverage =
    HERO_BLACK_PANEL_INITIAL_TOP_COVERAGE +
    (100 - HERO_BLACK_PANEL_INITIAL_TOP_COVERAGE) * overlayCoverProgress;
  const blackPanelBottomCoverage =
    HERO_BLACK_PANEL_INITIAL_BOTTOM_COVERAGE +
    (100 - HERO_BLACK_PANEL_INITIAL_BOTTOM_COVERAGE) * overlayCoverProgress;
  const blackPanelClipPath = `polygon(0 0, ${blackPanelTopCoverage}% 0, ${blackPanelBottomCoverage}% 100%, 0 100%)`;
  const redPanelClipPath = `polygon(${blackPanelTopCoverage}% 0, 100% 0, 100% 100%, ${blackPanelBottomCoverage}% 100%)`;
  const terminalCommandText = CATEGORY_WORDS.join(" ").replaceAll(", ", ", ");
  const terminalPromptText = HERO_TERMINAL_PROMPT;
  const enterWordmarkCompletionDurationMs = Math.round(
    HERO_ENTER_WORDMARK_COMPLETION_DURATION * 1000
  );
  const enterTransitionScrollDelayMs =
    enterWordmarkCompletionDurationMs + HERO_ENTER_TRANSITION_SCROLL_DELAY_MS;
  const enterTransitionCompleteDelayMs =
    enterTransitionScrollDelayMs + HERO_ENTER_TRANSITION_COMPLETE_DELAY_MS;
  const { isTypingComplete, visibleTerminalLine } = useHeroTerminalTyping({
    isReady: isHeroRevealReady,
    prefersReducedMotion: shouldReduceMotion,
    promptText: terminalPromptText,
    typedText: terminalCommandText,
    typingStartDelayMs: HERO_TERMINAL_TYPING_START_DELAY_MS,
    typingStepDurationMs: HERO_TERMINAL_TYPING_STEP_DURATION_MS
  });

  function renderBrandWordmarkCharacters(characterInnerClassName) {
    return brandCharacters.map((character, index) => {
      const movementDistance = getMovementDistance(index);
      const inverseStaggerDelay = getInverseStaggerDelay(
        index,
        brandCharacters.length
      );
      const totalVerticalTravelDistance =
        viewportHeight * MINIMUM_OUTRO_LIFT_VIEWPORT_FACTOR + movementDistance;
      const scrollTranslateY = -totalVerticalTravelDistance * effectiveScrollProgress;
      const introStartDistance = viewportHeight + totalVerticalTravelDistance;

      return (
        <motion.span
          key={`${characterInnerClassName}-${character}-${index}`}
          className={styles.brandCharacterOuter}
          animate={{ y: scrollTranslateY }}
          transition={{
            duration: isEnterWordmarkCompletionActive
              ? HERO_ENTER_WORDMARK_COMPLETION_DURATION
              : 0,
            ease: "linear"
          }}
        >
          <motion.span
            className={characterInnerClassName}
            initial={
              shouldReduceMotion
                ? false
                : { y: introStartDistance, opacity: 0, filter: "blur(8px)" }
            }
            animate={
              shouldReduceMotion
                ? { opacity: isHeroRevealReady ? 1 : 0, y: 0 }
                : {
                    y: isHeroRevealReady ? 0 : introStartDistance,
                    opacity: isHeroRevealReady ? 1 : 0,
                    filter: isHeroRevealReady ? "blur(0px)" : "blur(8px)"
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.72,
              ease: [0.2, 0.7, 0.2, 1],
              delay: shouldReduceMotion ? 0 : inverseStaggerDelay
            }}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        </motion.span>
      );
    });
  }

  useEffect(() => {
    function handleEnterKey(event) {
      const activeElement = document.activeElement;
      const isTypingIntoField =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (
        event.key !== "Enter" ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isTypingIntoField ||
        !isHeroRevealReady ||
        isEnterTransitionActive ||
        scrollProgress > HERO_ENTER_TRANSITION_TRIGGER_SCROLL_PROGRESS
      ) {
        return;
      }

      event.preventDefault();
      enterTransitionTimeoutReferences.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      setEnterTransitionPhase("wordmark-completing");

      if (shouldReduceMotion) {
        document
          .getElementById("marketing-products-section")
          ?.scrollIntoView({ behavior: "auto", block: "start" });
        setEnterTransitionPhase("idle");
        return;
      }

      const overlayTimeoutId = window.setTimeout(() => {
        setEnterTransitionPhase("terminal-overlay");
      }, enterWordmarkCompletionDurationMs);

      const scrollTimeoutId = window.setTimeout(() => {
        document
          .getElementById("marketing-products-section")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, enterTransitionScrollDelayMs);

      const completeTimeoutId = window.setTimeout(() => {
        setEnterTransitionPhase("idle");
      }, enterTransitionCompleteDelayMs);

      enterTransitionTimeoutReferences.current = [
        overlayTimeoutId,
        scrollTimeoutId,
        completeTimeoutId
      ];
    }

    window.addEventListener("keydown", handleEnterKey);
    return () => {
      window.removeEventListener("keydown", handleEnterKey);
    };
  }, [
    enterTransitionCompleteDelayMs,
    enterTransitionScrollDelayMs,
    enterWordmarkCompletionDurationMs,
    isEnterTransitionActive,
    isHeroRevealReady,
    scrollProgress,
    shouldReduceMotion
  ]);

  return (
    <div ref={heroContainerReference} className={styles.heroScene}>
      <div className={styles.heroViewport}>
        <section className={styles.heroSection} aria-label="Brand hero">
          <HeroTerminalTransitionOverlay
            isVisible={isEnterTransitionOverlayVisible}
            prefersReducedMotion={shouldReduceMotion}
          />
          <div className={styles.heroMedia} aria-hidden="true">
            <motion.video
              ref={heroVideoReference}
              className={styles.heroVideo}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              initial={shouldReduceMotion ? false : { scale: 1.06, filter: "blur(0px)" }}
              animate={
                shouldReduceMotion
                  ? { opacity: heroVideoOpacity }
                  : {
                      opacity: heroVideoOpacity,
                      scale: isHeroRevealReady ? 1 : 1.06,
                      filter: "blur(0px)"
                    }
              }
              transition={{
                opacity: { duration: 0.28, ease: "linear" },
                scale: {
                  duration: shouldReduceMotion ? 0 : HERO_MEDIA_SETTLE_DURATION,
                  ease: [0.16, 1, 0.3, 1]
                },
                filter: {
                  duration: shouldReduceMotion ? 0 : HERO_MEDIA_SETTLE_DURATION,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
            >
              <source src="/assets/videos/bg.mp4" type="video/mp4" />
            </motion.video>
            <motion.div
              className={styles.heroOverlayRight}
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.03 }}
              animate={
                shouldReduceMotion
                  ? { opacity: heroOverlayOpacity }
                  : {
                      opacity: heroOverlayOpacity,
                      scale: isHeroRevealReady ? 1 : 1.03
                    }
              }
              transition={{
                opacity: {
                  duration: shouldReduceMotion ? 0.2 : HERO_OVERLAY_REVEAL_DURATION,
                  delay: shouldReduceMotion ? 0 : HERO_OVERLAY_REVEAL_DELAY,
                  ease: [0.16, 1, 0.3, 1]
                },
                scale: {
                  duration: shouldReduceMotion ? 0 : HERO_OVERLAY_REVEAL_DURATION,
                  delay: shouldReduceMotion ? 0 : HERO_OVERLAY_REVEAL_DELAY,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
            />
          </div>

          <motion.div
            className={styles.heroTerminal}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    x: -16,
                    y: -10,
                    filter: "blur(6px)"
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: categoryOpacity }
                : {
                    opacity: categoryOpacity,
                    x: isHeroRevealReady ? 0 : -16,
                    y: isHeroRevealReady ? 0 : -10,
                    filter: isHeroRevealReady ? "blur(0px)" : "blur(6px)"
                  }
            }
            transition={{
              opacity: {
                duration: shouldReduceMotion ? 0.2 : 1.1,
                delay: shouldReduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1]
              },
              x: {
                duration: shouldReduceMotion ? 0 : 1.1,
                delay: shouldReduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1]
              },
              y: {
                duration: shouldReduceMotion ? 0 : 1.1,
                delay: shouldReduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1]
              },
              filter: {
                duration: shouldReduceMotion ? 0 : 1.1,
                delay: shouldReduceMotion ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <pre className={styles.heroTerminalLine}>
              <span className={styles.heroTerminalPrompt}>
                {terminalPromptText}
              </span>
              <span>{visibleTerminalLine.slice(terminalPromptText.length)}</span>
              <span
                aria-hidden="true"
                className={`${styles.heroTerminalCursor} ${
                  isTypingComplete ? styles.heroTerminalCursorIdle : ""
                }`}
              >
                █
              </span>
            </pre>
            <p className={styles.heroTerminalHint}>
              <span className={styles.heroTerminalHintText}>press &lt;Enter&gt; to continue</span>
            </p>
          </motion.div>

          <motion.div
            aria-hidden="true"
            className={styles.heroStencilPanel}
            style={{ clipPath: blackPanelClipPath }}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    filter: `blur(${HERO_CONTENT_BLUR_AMOUNT}px)`
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: isHeroRevealReady ? 1 : 0 }
                : {
                    opacity: isHeroRevealReady ? 1 : 0,
                    y: isHeroRevealReady ? 0 : 28,
                    filter: isHeroRevealReady
                      ? "blur(0px)"
                      : `blur(${HERO_CONTENT_BLUR_AMOUNT}px)`
                  }
            }
            transition={{
              opacity: {
                duration: shouldReduceMotion ? 0.2 : HERO_CONTENT_REVEAL_DURATION,
                delay: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DELAY,
                ease: [0.16, 1, 0.3, 1]
              },
              y: {
                duration: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DURATION,
                delay: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DELAY,
                ease: [0.16, 1, 0.3, 1]
              },
              filter: {
                duration: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DURATION,
                delay: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DELAY,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <h1 className={`brand-wordmark ${styles.brandStencilHeading}`}>
              {renderBrandWordmarkCharacters(styles.brandStencilCharacterInner)}
            </h1>
          </motion.div>

          <motion.div
            className={styles.heroContent}
            style={{ clipPath: redPanelClipPath }}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 28,
                    filter: `blur(${HERO_CONTENT_BLUR_AMOUNT}px)`
                  }
            }
            animate={
              shouldReduceMotion
                ? { opacity: isHeroRevealReady ? 1 : 0 }
                : {
                    opacity: isHeroRevealReady ? 1 : 0,
                    y: isHeroRevealReady ? 0 : 28,
                    filter: isHeroRevealReady
                      ? "blur(0px)"
                      : `blur(${HERO_CONTENT_BLUR_AMOUNT}px)`
                  }
            }
            transition={{
              opacity: {
                duration: shouldReduceMotion ? 0.2 : HERO_CONTENT_REVEAL_DURATION,
                delay: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DELAY,
                ease: [0.16, 1, 0.3, 1]
              },
              y: {
                duration: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DURATION,
                delay: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DELAY,
                ease: [0.16, 1, 0.3, 1]
              },
              filter: {
                duration: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DURATION,
                delay: shouldReduceMotion ? 0 : HERO_CONTENT_REVEAL_DELAY,
                ease: [0.16, 1, 0.3, 1]
              }
            }}
          >
            <h1
              aria-label={BRAND_NAME}
              className={`brand-wordmark ${styles.brandHeading}`}
            >
              {renderBrandWordmarkCharacters(styles.brandCharacterInner)}
            </h1>
          </motion.div>
        </section>
      </div>
      <div className={styles.heroScrollSpacer} aria-hidden="true" />
    </div>
  );
}
