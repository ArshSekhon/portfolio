import React from "react";

import { TweenMax, Power1 } from "gsap";

import styles from "./LoadingText.module.css";
import { motion } from "framer-motion";

export default () => {
  return (
    <div className={styles.loadingTextWrapper}>
      <div className={styles.loadingText}>&nbsp;LOADING</div>
      <motion.div
        className={styles.loadingTextStrikeThrough}
        animate={{ left: ["-100%", "100%"] }}
        transition={{
          repeatDelay: 0.55,
          repeat: Infinity,
          ease: "easeInOut",
          duration: 1.1,
        }}
      ></motion.div>
    </div>
  );
};
