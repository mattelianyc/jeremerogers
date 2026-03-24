"use client";

import { useEffect, useMemo, useState } from "react";

export function useHeroTerminalTyping({
  isReady,
  prefersReducedMotion,
  promptText,
  typedText,
  typingStartDelayMs,
  typingStepDurationMs
}) {
  const fullTerminalLine = useMemo(
    () => `${promptText}${typedText}`,
    [promptText, typedText]
  );
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(
    prefersReducedMotion ? fullTerminalLine.length : 0
  );

  useEffect(() => {
    if (!isReady) {
      setVisibleCharacterCount(prefersReducedMotion ? fullTerminalLine.length : 0);
      return undefined;
    }

    if (prefersReducedMotion) {
      setVisibleCharacterCount(fullTerminalLine.length);
      return undefined;
    }

    setVisibleCharacterCount(0);

    let typingIntervalId = null;
    const typingTimeoutId = window.setTimeout(() => {
      typingIntervalId = window.setInterval(() => {
        setVisibleCharacterCount((currentCount) => {
          if (currentCount >= fullTerminalLine.length) {
            window.clearInterval(typingIntervalId);
            return currentCount;
          }

          return currentCount + 1;
        });
      }, typingStepDurationMs);
    }, typingStartDelayMs);

    return () => {
      window.clearTimeout(typingTimeoutId);
      if (typingIntervalId) {
        window.clearInterval(typingIntervalId);
      }
    };
  }, [
    fullTerminalLine.length,
    fullTerminalLine,
    isReady,
    prefersReducedMotion,
    typingStartDelayMs,
    typingStepDurationMs
  ]);

  return {
    fullTerminalLine,
    visibleCharacterCount,
    visibleTerminalLine: fullTerminalLine.slice(0, visibleCharacterCount),
    isTypingComplete: visibleCharacterCount >= fullTerminalLine.length
  };
}
