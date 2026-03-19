import React from "react";
import styles from "./IntroText.module.css";
import { useAnimation, motion } from "framer-motion";

/**
 * IntroText — displays the intro message SVG with slide-in/slide-out animation.
 *
 * ENTRY (showIntro=true): slides up from y:100% to y:0%, fades in (0.7s easeIn)
 * EXIT (showIntro=false): slides up to y:-30%, fades out (0.7s easeOut),
 *   then .then() calls setIntroComplete() which triggers the parent (index.tsx)
 *   to unmount IntroText and render Home.
 *
 * @param showIntro - true to show, false to trigger exit animation
 * @param setIntroComplete - callback fired after exit animation completes
 */
const IntroText = ({ showIntro, setIntroComplete }) => {
  const introTextControl = useAnimation();

  const startEntryAnimation = () => {
    introTextControl.stop();
    return introTextControl.start({
      y: "0%",
      opacity: 1,
      transition: { ease: "easeIn", duration: 0.7 },
    });
  };

  const startExitAnimation = () => {
    introTextControl.stop();
    return introTextControl
      .start({
        y: "-30%",
        opacity: 0,
        transition: { ease: "easeOut", duration: 0.7 },
      })
      .then(() => {
        setIntroComplete();
      });
  };

  React.useEffect(() => {
    if (showIntro) startEntryAnimation();
    else startExitAnimation();
  }, [showIntro]);

  return (
    <motion.div initial={{ opacity: 0, y: "100%" }} animate={introTextControl}>
      <img
        className={styles.introMessageSVG}
        src="/assets/branding/intro.svg"
      />
    </motion.div>
  );
};

export default IntroText;
