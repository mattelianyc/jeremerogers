"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./BrandHeroReprisal.module.css";
import { useHeroTerminalTyping } from "./useHeroTerminalTyping";
import { Footer } from "@/components/Footer";

const REPRISAL_BRAND_NAME = "ALMO SEBASTIAN";
const REPRISAL_TERMINAL_PROMPT = "";
const REPRISAL_TERMINAL_COMMAND = "@jeremerogers";
const REPRISAL_INSTAGRAM_URL = "https://www.instagram.com/jeremerogers";
const REPRISAL_SCROLL_DISTANCE_FACTOR = 0.72;
const REPRISAL_FINAL_TOP_LEFT_COVERAGE = 84;
const REPRISAL_FINAL_BOTTOM_LEFT_COVERAGE = 64;
const REPRISAL_CHARACTER_REVEAL_START = 0.18;
const REPRISAL_CHARACTER_REVEAL_DURATION = 0.17;
const REPRISAL_CHARACTER_REVEAL_STAGGER = 0.028;
const REPRISAL_CHARACTER_EXIT_DISTANCE = 260;
const REPRISAL_CHARACTER_EXIT_VIEWPORT_FACTOR = 0.14;
const REPRISAL_PANEL_REVEAL_PROGRESS = 0.58;
const REPRISAL_PANEL_REVEAL_START = 0.04;
const REPRISAL_MEDIA_REVEAL_START = 0.06;
const REPRISAL_MEDIA_REVEAL_END = 0.22;
const REPRISAL_TERMINAL_REVEAL_START = 0.001;
const REPRISAL_TERMINAL_REVEAL_END = 0.002;
const REPRISAL_FOOTER_CHARACTER_EXIT_START = 0.03;
const REPRISAL_FOOTER_CHARACTER_EXIT_STAGGER = 0.018;
const REPRISAL_FOOTER_CHARACTER_EXIT_DURATION = 0.22;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function BrandHeroReprisal() {
  const sceneReference = useRef(null);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(900);

  const brandCharacters = REPRISAL_BRAND_NAME.split("");
  const terminalRevealProgress = shouldReduceMotion
    ? 1
    : clamp(
        (scrollProgress - REPRISAL_TERMINAL_REVEAL_START) /
          (REPRISAL_TERMINAL_REVEAL_END - REPRISAL_TERMINAL_REVEAL_START),
        0,
        1
      );
  const panelRevealProgress = shouldReduceMotion
    ? 1
    : clamp(scrollProgress / REPRISAL_PANEL_REVEAL_PROGRESS, 0, 1);
  const panelRevealProgressWithDelay = shouldReduceMotion
    ? 1
    : clamp(
        (scrollProgress - REPRISAL_PANEL_REVEAL_START) /
          (REPRISAL_PANEL_REVEAL_PROGRESS - REPRISAL_PANEL_REVEAL_START),
        0,
        1
      );
  const mediaRevealProgress = shouldReduceMotion
    ? 1
    : clamp(
        (scrollProgress - REPRISAL_MEDIA_REVEAL_START) /
          (REPRISAL_MEDIA_REVEAL_END - REPRISAL_MEDIA_REVEAL_START),
        0,
        1
      );
  const blackPanelTopLeftCoverage =
    REPRISAL_FINAL_TOP_LEFT_COVERAGE * panelRevealProgressWithDelay;
  const blackPanelBottomLeftCoverage =
    REPRISAL_FINAL_BOTTOM_LEFT_COVERAGE * panelRevealProgressWithDelay;
  const blackPanelClipPath = `polygon(${blackPanelTopLeftCoverage}% 0, 100% 0, 100% 100%, ${blackPanelBottomLeftCoverage}% 100%)`;
  const redPanelClipPath = `polygon(0 0, ${blackPanelTopLeftCoverage}% 0, ${blackPanelBottomLeftCoverage}% 100%, 0 100%)`;
  const baseHeadingOpacity = shouldReduceMotion ? 0 : clamp(1 - panelRevealProgress / 0.28, 0, 1);
  const terminalOffsetX = (1 - terminalRevealProgress) * 22;
  const terminalOffsetY = (1 - terminalRevealProgress) * 16;
  const terminalBlurAmount = (1 - terminalRevealProgress) * 6;
  const footerLayerOpacity = shouldReduceMotion
    ? 1
    : clamp(1 - panelRevealProgressWithDelay / 0.5, 0, 1);

  const { isTypingComplete, visibleTerminalLine } = useHeroTerminalTyping({
    isReady: shouldReduceMotion || terminalRevealProgress >= 0.98,
    prefersReducedMotion: shouldReduceMotion,
    promptText: REPRISAL_TERMINAL_PROMPT,
    typedText: REPRISAL_TERMINAL_COMMAND,
    typingStartDelayMs: 600,
    typingStepDurationMs: 52
  });

  useEffect(() => {
    function handleEnterKey(event) {
      if (event.key !== "Enter") return;

      const activeElement = document.activeElement;
      const isTypingIntoField =
        activeElement instanceof HTMLInputElement ||
        activeElement instanceof HTMLTextAreaElement ||
        activeElement?.getAttribute("contenteditable") === "true";

      if (isTypingIntoField) return;

      const sceneElement = sceneReference.current;
      if (!sceneElement) return;

      const rect = sceneElement.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      if (Math.abs(sectionCenter - viewportCenter) > window.innerHeight * 0.6) return;

      event.preventDefault();
      window.location.assign(REPRISAL_INSTAGRAM_URL);
    }

    window.addEventListener("keydown", handleEnterKey);
    return () => window.removeEventListener("keydown", handleEnterKey);
  }, []);

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
      if (!sceneReference.current) {
        return;
      }

      const sectionTopOffset = sceneReference.current.offsetTop;
      const scrollWithinSection = Math.max(window.scrollY - sectionTopOffset, 0);
      const animationDistance = window.innerHeight * REPRISAL_SCROLL_DISTANCE_FACTOR;
      const nextProgress = clamp(scrollWithinSection / animationDistance, 0, 1);
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

  function renderReprisalCharacters(innerClassName) {
    return brandCharacters.map((character, index) => {
      const staggerIndex = brandCharacters.length - index - 1;
      const revealStart =
        REPRISAL_CHARACTER_REVEAL_START + staggerIndex * REPRISAL_CHARACTER_REVEAL_STAGGER;
      const revealEnd = revealStart + REPRISAL_CHARACTER_REVEAL_DURATION;
      const characterRevealProgress = shouldReduceMotion
        ? 1
        : clamp((scrollProgress - revealStart) / (revealEnd - revealStart), 0, 1);
      const hiddenTranslateY =
        viewportHeight * REPRISAL_CHARACTER_EXIT_VIEWPORT_FACTOR +
        REPRISAL_CHARACTER_EXIT_DISTANCE;
      const translateY = hiddenTranslateY * (1 - characterRevealProgress);
      const opacity = characterRevealProgress;
      const blurAmount = (1 - characterRevealProgress) * 8;

      return (
        <span
          key={`reprisal-${innerClassName}-${character}-${index}`}
          className={styles.characterOuter}
          style={{
            transform: `translate3d(0, ${translateY}px, 0)`,
            opacity,
            filter: `blur(${blurAmount}px)`
          }}
        >
          <span className={innerClassName}>
            {character === " " ? "\u00A0" : character}
          </span>
        </span>
      );
    });
  }

  function renderFooterWordmarkCharacters() {
    return brandCharacters.map((character, index) => {
      const characterExitStart =
        REPRISAL_FOOTER_CHARACTER_EXIT_START + index * REPRISAL_FOOTER_CHARACTER_EXIT_STAGGER;
      const characterExitProgress = shouldReduceMotion
        ? panelRevealProgressWithDelay
        : clamp(
            (panelRevealProgressWithDelay - characterExitStart) /
              REPRISAL_FOOTER_CHARACTER_EXIT_DURATION,
            0,
            1
          );
      const characterTranslateY =
        (viewportHeight * 0.22 + 100) * characterExitProgress;
      const characterOpacity = 1 - characterExitProgress;
      const characterBlurAmount = characterExitProgress * 4;

      return (
        <span
          key={`reprisal-footer-wordmark-${character}-${index}`}
          className={styles.footerWordmarkCharacterOuter}
          style={{
            transform: `translate3d(0, ${characterTranslateY}px, 0)`,
            opacity: characterOpacity,
            filter: `blur(${characterBlurAmount}px)`
          }}
        >
          <span className={styles.footerWordmarkCharacterInner}>
            {character === " " ? "\u00A0" : character}
          </span>
        </span>
      );
    });
  }

  return (
    <div ref={sceneReference} className={styles.reprisalScene}>
      <div className={styles.reprisalViewport}>
        <section className={styles.reprisalSection} aria-label="Brand reprisal">
          <div
            className={styles.footerLayer}
            style={{ opacity: footerLayerOpacity }}
          >
            <Footer
              useDefaultStyles={false}
              className={styles.footerLayerRoot}
              innerClassName={styles.footerLayerInner}
              topGridClassName={styles.footerLayerTopGrid}
              brandBlockClassName={styles.footerLayerBrandBlock}
              eyebrowClassName={styles.footerLayerEyebrow}
              brandNameClassName={styles.footerLayerBrandName}
              brandDescriptionClassName={styles.footerLayerBrandDescription}
              socialBlockClassName={styles.footerLayerSocialBlock}
              socialLabelClassName={styles.footerLayerSocialLabel}
              socialLinkClassName={styles.footerLayerSocialLink}
              bottomRowClassName={styles.footerLayerBottomRow}
              copyrightClassName={styles.footerLayerCopyright}
              brandNameContent={renderFooterWordmarkCharacters()}
            />
          </div>
          <div
            className={styles.media}
            aria-hidden="true"
            style={{ opacity: mediaRevealProgress }}
          >
            
            <video
              className={styles.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src="/assets/videos/bg.mp4" type="video/mp4" />
            </video>
            <div
              className={styles.overlayLeft}
              style={{ opacity: 1 }}
            />
            
          </div>

          <div
            className={styles.baseHeadingPanel}
            style={{ opacity: baseHeadingOpacity }}
          >
            <h2 className={`brand-wordmark ${styles.baseHeading}`}>
              {renderReprisalCharacters(styles.baseCharacterInner)}
            </h2>
          </div>

          <div
            aria-hidden="true"
            className={styles.stencilPanel}
            style={{ clipPath: blackPanelClipPath }}
          >
            <h2 className={`brand-wordmark ${styles.stencilHeading}`}>
              {renderReprisalCharacters(styles.stencilCharacterInner)}
            </h2>
          </div>

          <div
            className={styles.contentPanel}
            style={{ clipPath: redPanelClipPath }}
          >
            <h2
              aria-label={REPRISAL_BRAND_NAME}
              className={`brand-wordmark ${styles.heading}`}
            >
              {renderReprisalCharacters(styles.characterInner)}
            </h2>
          </div>

          <motion.div
            className={styles.terminal}
            animate={
              shouldReduceMotion
                ? { opacity: terminalRevealProgress }
                : {
                    opacity: terminalRevealProgress,
                    x: terminalOffsetX,
                    y: terminalOffsetY,
                    filter: `blur(${terminalBlurAmount}px)`
                  }
            }
            transition={{ duration: 0.08, ease: "linear" }}
          >
            <pre className={styles.terminalLine}>
              <span className={styles.terminalPrompt}>
                {REPRISAL_TERMINAL_PROMPT}
              </span>
              <a
                href={REPRISAL_INSTAGRAM_URL}
                rel="noreferrer"
                className={styles.terminalLink}
              >
                {visibleTerminalLine.slice(REPRISAL_TERMINAL_PROMPT.length)}
              </a>
              <span
                aria-hidden="true"
                className={`${styles.terminalCursor} ${
                  isTypingComplete ? styles.terminalCursorIdle : ""
                }`}
              >
                █
              </span>
            </pre>
            <p className={styles.terminalHint}>
              <span className={styles.terminalHintText}>
                press &lt;Enter&gt; 
              </span>
            </p>
          </motion.div>
        </section>
      </div>
      <div className={styles.reprisalScrollSpacer} aria-hidden="true" />
    </div>
  );
}
