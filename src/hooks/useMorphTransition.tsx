import { useLayoutEffect, useRef } from "react";
import { animate } from "framer-motion";
import { useAppContext } from "../providers/AppContext";

/**
 * Morph animation: element stays horizontally centered,
 * only animates vertically from source to target position.
 * Calls onComplete when the animation finishes.
 */
export default function useMorphTransition(duration = 0.6, onComplete?: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const appCtx = useAppContext();

  useLayoutEffect(() => {
    const sourceRect = appCtx.navTransitionRect;
    if (!sourceRect || !ref.current) {
      // No morph needed (e.g. direct navigation, refresh)
      // Still fire onComplete so characters collapse
      if (onComplete) {
        const t = setTimeout(onComplete, 100);
        return () => clearTimeout(t);
      }
      return;
    }

    const el = ref.current;
    const targetRect = el.getBoundingClientRect();

    console.log("[MORPH] === START ===");
    console.log("[MORPH] source top:", Math.round(sourceRect.top), "→ target top:", Math.round(targetRect.top));

    const t0 = performance.now();

    // Reserve space in flow
    el.style.height = el.offsetHeight + "px";

    // Fix to center, start at source vertical position
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.transform = "translateX(-50%)";
    el.style.top = sourceRect.top + "px";
    el.style.zIndex = "100";
    el.style.margin = "0";

    el.getBoundingClientRect(); // force reflow

    // Animate only vertical position
    const controls = animate(sourceRect.top, targetRect.top, {
      duration,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => {
        el.style.top = v + "px";
      },
      onComplete: () => {
        console.log("[MORPH] t=" + Math.round(performance.now() - t0) + "ms | Complete");
        el.style.position = "";
        el.style.top = "";
        el.style.left = "";
        el.style.transform = "";
        el.style.zIndex = "";
        el.style.height = "";
        el.style.margin = "";
        appCtx.setNavTransitionRect(null);
        if (onComplete) onComplete();
      },
    });

    return () => {
      controls.stop();
      el.style.position = "";
      el.style.top = "";
      el.style.left = "";
      el.style.transform = "";
      el.style.zIndex = "";
      el.style.height = "";
      el.style.margin = "";
    };
  }, []);

  return ref;
}
