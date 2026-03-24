"use client";

import { useEffect } from "react";

const START_BACKGROUND_COLOR = [233, 216, 182];
const END_BACKGROUND_COLOR = [255, 255, 255];

function interpolateColorChannel(startValue, endValue, progress) {
  return Math.round(startValue + (endValue - startValue) * progress);
}

function getInterpolatedBackgroundColor(progress) {
  const redChannel = interpolateColorChannel(
    START_BACKGROUND_COLOR[0],
    END_BACKGROUND_COLOR[0],
    progress
  );
  const greenChannel = interpolateColorChannel(
    START_BACKGROUND_COLOR[1],
    END_BACKGROUND_COLOR[1],
    progress
  );
  const blueChannel = interpolateColorChannel(
    START_BACKGROUND_COLOR[2],
    END_BACKGROUND_COLOR[2],
    progress
  );

  return `rgb(${redChannel} ${greenChannel} ${blueChannel})`;
}

export function BackgroundScrollTransition() {
  useEffect(() => {
    const rootElement = document.documentElement;
    let animationFrameId = null;

    function updateBackgroundColor() {
      const scrollableDistance =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress =
        scrollableDistance > 0 ? Math.min(window.scrollY / scrollableDistance, 1) : 0;

      rootElement.style.setProperty(
        "--color-background",
        getInterpolatedBackgroundColor(scrollProgress)
      );
    }

    function handleScrollOrResize() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(updateBackgroundColor);
    }

    updateBackgroundColor();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      rootElement.style.setProperty("--color-background", "rgb(233 216 182)");
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  return null;
}
