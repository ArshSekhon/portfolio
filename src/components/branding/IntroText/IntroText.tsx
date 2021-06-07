import React from "react";
import styles from "./IntroText.module.css";
import { useAnimation, motion } from "framer-motion";

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
