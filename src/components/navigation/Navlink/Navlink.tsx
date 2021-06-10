import React from "react";
import { useRouter } from "next/router";
import { useAnimation, motion } from "framer-motion";
import styles from "./Navlink.module.css";

export default function Navlink({
  text,
  href,
  enabled,
  expandedCharSpacing = "30px",
  normalCharSpacing = "10px", //"0.27em",
  onClick: customOnClick = undefined,
  fontSize = undefined,
  navigationDelay = 500,
  isExpanded = false,
  ...props
}) {
  const router = useRouter();
  const strikeoutAnimationControl = useAnimation();
  const [isClicked, setIsClicked] = React.useState(false);

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
      setIsClicked((v) => !v);
      if (customOnClick) customOnClick();

      setTimeout(() => {
        router.push(href);
      }, navigationDelay);
    }
  };

  return (
    <div
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
            transition={{ duration: 0.5 }}
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
