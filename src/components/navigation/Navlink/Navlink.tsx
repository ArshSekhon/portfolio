import React from "react";
import { useRouter } from "next/router";
import { useAnimation, motion } from "framer-motion";
import styles from "./Navlink.module.css";
import { useBreakpointValue, useMediaQuery } from "@chakra-ui/react";
import { useAppContext } from "../../../providers/AppContext";

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
  const wrapperRef = React.useRef(null);
  const strikeoutAnimationControl = useAnimation();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isScreenLargerThan768] = useMediaQuery(["(min-width: 768px)"]);
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

      setTimeout(() => {
        clearInterval(interval);
        // Capture bounding rect just before navigation for morph effect
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
            transition={{ duration: hydrated ? 0.5 : 0 }}
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
