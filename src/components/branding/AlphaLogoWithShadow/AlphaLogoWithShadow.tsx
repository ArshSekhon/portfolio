import React from "react";
import { motion } from "framer-motion";

import styles from "./AlphaLogoWithShadow.module.css";

const AlphaLogoWithShadow = () => {
  return (
    <div className={styles.alphaLogoWithShadowContainer}>
      <motion.div
        className={styles.alphaLogo}
        initial={{originX:0.5, originY:0.578}}
        animate={{ rotate: [60, 420], y: ["-10%", "-20%"] }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 18,
            delay: 0,
            repeatDelay: 0,
            ease: "linear",
          },
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 3,
            delay: 0,
            repeatDelay: 0,
            ease: "easeInOut",
          },
        }}
      >
        <img alt="alpha logo" src={"/assets/branding/alpha.svg"} />
      </motion.div>
      <motion.div
        className={styles.alphaShadow}
        animate={{ scale: [0.6, 1], opacity: [1, 0.4] }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 3,
          ease: "easeInOut",
          delay: 0,
          repeatDelay: 0,
        }}
      >
        <img
          alt="alpha logo shadwow"
          src={"/assets/branding/alpha-shadow.svg"}
        />
      </motion.div>
    </div>
  );
};

export default AlphaLogoWithShadow;
