import React from "react";
import { useRouter } from "next/router";
import { useAnimation, motion } from "framer-motion";
import styles from "./Navlink.module.css";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
import { useAppContext } from "../../../providers/AppContext";

/**
 * Navlink — animated navigation link with character-level motion.
 *
 * ANIMATION SYSTEM:
 * - Each character is rendered as a separate <motion.span> with framer-motion variants.
 * - "normal" variant: characters at normalCharSpacing (10px desktop, 5px mobile)
 * - "expanded" variant: characters at expandedCharSpacing (30px desktop, 15px mobile)
 * - When isClicked toggles, characters animate between normal <-> expanded spacing.
 * - When isExpanded prop is true (used on destination pages), normalCharSpacing is
 *   overridden to expandedCharSpacing, so characters start expanded then collapse
 *   when the morph completes and isExpanded becomes false.
 *
 * STRIKEOUT HOVER ANIMATION:
 * - A <motion.div> bar slides in from left on hover (animateStrikeOut)
 *   and slides out on mouse leave (animateClearStrikeout).
 * - Disabled once the link is clicked (isClicked guard).
 *
 * HYDRATION FIX:
 * - `hydrated` state starts false, set to true after 50ms.
 * - transition.duration is 0 when !hydrated to prevent the characters from visibly
 *   animating on initial render / hydration (SSR mismatch avoidance).
 *
 * NAVIGATION DELAY FLOW (onClick):
 * 1. setIsClicked(true) -> characters expand (normal -> expanded variant)
 * 2. customOnClick fires -> parent (Home.tsx) starts exit animations
 *    (other links fade, logo/banner fade)
 * 3. After navigationDelay (default 500ms):
 *    a. Captures this element's bounding rect into appCtx.navTransitionRect
 *       (used by useMorphTransition on the destination page)
 *    b. Calls router.push(href) to navigate
 *
 * @param text - Link display text (split into individual characters)
 * @param href - Navigation target route
 * @param enabled - Whether clicking triggers navigation
 * @param isExpanded - Force expanded character spacing (used on destination page titles)
 * @param navigationDelay - Ms to wait before navigating (default 500), allows exit animations
 */
export default function Navlink({
  text,
  href,
  enabled = true,
  expandedCharSpacing = undefined,
  normalCharSpacing = undefined,
  onClick: customOnClick = undefined,
  fontSize = undefined,
  navigationDelay = 500,
  isExpanded = false,
  isVertical = false,
  ...props
}) {
  const router = useRouter();
  const appCtx = useAppContext();
  const wrapperRef = React.useRef(null); // Used to capture bounding rect before navigation for morph
  const strikeoutAnimationControl = useAnimation();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isScreenLargerThan768] = useMediaQuery(["(min-width: 768px)"]);
  // Hydration fix: delay enabling CSS transitions to avoid flash on SSR hydration
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setHydrated(true), 50);
    return () => clearTimeout(t);
  }, []);

  //set default values
  if (!normalCharSpacing) {
    normalCharSpacing = isScreenLargerThan768 ? "10px" : "5px";
  }

  if (!expandedCharSpacing) {
    expandedCharSpacing = isScreenLargerThan768 ? "30px" : "15px";
  }

  if (!fontSize) {
    fontSize = useBreakpointValue({ base: "2rem", md: "2rem", sm: "2rem" });
  }

  // When isExpanded is true (destination page title), override normal spacing so characters
  // render expanded; when morph completes and isExpanded becomes false, they animate to normal
  if (isExpanded) normalCharSpacing = expandedCharSpacing;

  const animateClearStrikeout = () => {
    if (!isClicked)
      strikeoutAnimationControl.start({
        left: "100%",
        transition: { duration: 0.3, ease: "easeOut" },
      });
  };

  const animateStrikeOut = () => {
    if (!isClicked)
      strikeoutAnimationControl.start({
        left: "0%",
        transition: { duration: 0.3, ease: "easeIn" },
      });
  };

  const variants = {
    expanded: { margin: `0 ${expandedCharSpacing}` },
    normal: {
      margin: `0 ${normalCharSpacing}`,
    },
  };

  const onClick = () => {
    if (enabled) {
      console.log("[NAVLINK] Click on:", text, "href:", href);
      console.log("[NAVLINK] Window size:", window.innerWidth, "x", window.innerHeight);
      console.log("[NAVLINK] Scroll position:", window.scrollX, window.scrollY);

      const rectOnClick = wrapperRef.current?.getBoundingClientRect();
      console.log("[NAVLINK] Rect at click time:", rectOnClick ? JSON.stringify({ top: rectOnClick.top, left: rectOnClick.left, width: rectOnClick.width, height: rectOnClick.height }) : "no ref");

      setIsClicked((v) => !v);
      if (customOnClick) customOnClick();

      // Log rect changes during the delay
      const interval = setInterval(() => {
        if (wrapperRef.current) {
          const r = wrapperRef.current.getBoundingClientRect();
          const spans = wrapperRef.current.querySelectorAll("span");
          const cs = spans.length > 1 ? window.getComputedStyle(spans[1]).margin : "n/a";
          console.log("[NAVLINK] Rect during animation:", JSON.stringify({ top: Math.round(r.top), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height), charSpacing: cs }));
        }
      }, 100);

      // Wait for exit animations to finish, then capture position and navigate
      setTimeout(() => {
        clearInterval(interval);
        // Capture bounding rect just before navigation — stored in AppContext for useMorphTransition
        if (wrapperRef.current) {
          const rect = wrapperRef.current.getBoundingClientRect();
          const captured = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          };
          console.log("[NAVLINK] === FINAL rect before navigation ===:", JSON.stringify(captured));
          console.log("[NAVLINK] Element visibility:", window.getComputedStyle(wrapperRef.current).visibility, "opacity:", window.getComputedStyle(wrapperRef.current).opacity);
          appCtx.setNavTransitionRect(captured);
        }
        console.log("[NAVLINK] Pushing route:", href);
        router.push(href);
      }, navigationDelay);
    }
  };

  return (
    <div
      ref={wrapperRef}
      {...props}
      className={
        styles.horizontalStrikeoutLinkWrapper +
        (enabled ? "" : ` ${styles.disabled}`)
      }
      onClick={onClick}
      onMouseEnter={enabled ? animateClearStrikeout : () => {}}
      onMouseLeave={enabled ? animateStrikeOut : () => {}}
    >
      <a
        className={styles.horizontalStrikeoutLink}
        href={href}
        onClick={(e) => {
          e.preventDefault();
        }}
        style={fontSize ? { fontSize: fontSize } : {}}
      >
        <span className={styles.horizontalStrikeoutLinkTextCharacter}>
          {"\u00A0"}
        </span>
        {(text as string).split("").map((ch, idx) => (
          <motion.span
            key={idx}
            className={styles.horizontalStrikeoutLinkTextCharacter}
            animate={isClicked ? "expanded" : "normal"}
            variants={variants}
            transition={{ duration: hydrated ? 0.5 : 0 }} // 0 duration pre-hydration prevents flash
            style={{ margin: `0 ${normalCharSpacing}` }}
          >
            {ch}
          </motion.span>
        ))}
        <span className={styles.horizontalStrikeoutLinkTextCharacter}>
          {"\u00A0"}
        </span>
      </a>
      <motion.div
        animate={strikeoutAnimationControl}
        className={styles.horizontalStrikeout}
      ></motion.div>
    </div>
  );
}
