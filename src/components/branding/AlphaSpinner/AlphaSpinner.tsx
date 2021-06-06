import React from "react";
import { TimelineMax, Power4 } from "gsap";
import { motion } from "framer-motion";

import styles from "./AlphaSpinner.module.css";

export default () => {
  return (
    <>
      <motion.div
        className={styles.alphaSpinner}
        animate={{ rotate: [0, 0, 120, 120, 240, 240, 360] }}
        transition={{
          rotate: {
            repeat: Infinity,
            type: "tween",
            duration: 5,
            times: [0, 0.11, 0.33, 0.44, 0.66, 0.77, 0.99, 1],
            ease: "easeInOut",
          },
          repeatDelay: 0,
          delay: 0,
        }}
      >
        <img src="/assets/branding/alpha.svg" />
      </motion.div>
    </>
  );
};
