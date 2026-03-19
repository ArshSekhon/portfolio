import { useLayoutEffect, useRef } from "react";
import { animate } from "framer-motion";
import { useAppContext } from "../providers/AppContext";

/**
 * useMorphTransition — custom FLIP-inspired morph animation hook.
 *
 * BACKGROUND:
 * framer-motion v6+ removed AnimateSharedLayout / layoutId shared transitions.
 * This hook manually implements a similar effect: when a Navlink is clicked on
 * the Home page, its bounding rect is captured (see Navlink.tsx onClick) and
 * stored in AppContext.navTransitionRect. On the destination page (About, Contact),
 * the title element is rendered at its natural DOM position, then this hook
 * repositions it to match the source rect and animates it vertically to its
 * final position — creating the illusion that the nav link "flew" to become the
 * page title.
 *
 * FLOW:
 * 1. Navlink click -> characters expand -> link centers -> other links fade out
 * 2. After navigationDelay (500ms), Navlink captures its bounding rect into
 *    appCtx.navTransitionRect, then calls router.push()
 * 3. Destination page renders with a <div ref={morphRef}> around the title Navlink
 * 4. This hook (useLayoutEffect, runs before paint):
 *    a. Reads the stored source rect
 *    b. Measures the target rect of the newly mounted element
 *    c. Fixes the element to center, positions it at source.top
 *    d. Animates top from source -> target using framer-motion's animate()
 *    e. On complete: restores normal flow, clears navTransitionRect, calls onComplete
 * 5. onComplete typically collapses the expanded character spacing (setTitleExpanded(false))
 *
 * If no source rect exists (direct navigation / page refresh), onComplete fires
 * after a short delay so the title still collapses gracefully.
 *
 * NOTE: The Work page uses a different approach (CSS transition on `right`) because
 * the Work link is rotated -90deg and positioned on the right edge, making a
 * horizontal slide more appropriate than a vertical morph.
 *
 * @param duration - Animation duration in seconds (default 0.6)
 * @param onComplete - Callback fired when morph finishes (or immediately if no morph needed)
 * @returns A ref to attach to the morphing container element
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

    // Reserve space in the document flow so layout doesn't jump when we fix-position the element
    el.style.height = el.offsetHeight + "px";

    // Fix the element to viewport center horizontally, starting at the source's vertical position
    el.style.position = "fixed";
    el.style.left = "50%";
    el.style.transform = "translateX(-50%)";
    el.style.top = sourceRect.top + "px";
    el.style.zIndex = "100";
    el.style.margin = "0";

    el.getBoundingClientRect(); // Force reflow so the browser registers the start position before animating

    // Animate only the vertical position (horizontal is already centered via left:50% + translateX(-50%))
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
