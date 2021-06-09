import React from "react";
import { useRouter } from "next/router";
import { useAnimation, motion } from "framer-motion";
import styles from "./Navlink.module.css";

export default function Navlink({
  text,
  href,
  enabled,
  clickedCharSpacing = "50px",
  normalCharSpacing = "5px",
  fontSize = undefined,
}) {
  const router = useRouter();
  const strikeoutAnimationControl = useAnimation();
  const [isClicked, setIsClicked] = React.useState(false);

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
    clicked: { margin: `0 ${clickedCharSpacing}` },
    normal: { margin: `0 ${normalCharSpacing}` },
  };

  const onClick = () => {
    setIsClicked((v) => !v);
    setTimeout(() => {
      router.push(href);
      console.log("push");
    }, 700);
  };

  return (
    <div
      className={styles.horizontalStrikeoutLinkWrapper}
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
        style={fontSize ? { fontSize } : {}}
      >
        <span className={styles.horizontalStrikeoutLinkTextCharacter}>
          {"\u00A0"}
        </span>
        {(text as string).split("").map((ch, idx) => (
          <motion.span
            key={idx}
            className={styles.horizontalStrikeoutLinkTextCharacter}
            animate={isClicked ? "clicked" : "normal"}
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
