import React from "react";
import { TweenMax, TimelineMax, Power0, Power2 } from "gsap";
import { motion } from "framer-motion";

import styles from "./AlphaLogoWithShadow.module.css";

export default () => {
  return (
    <div className="alpha-logo-with-shadow">
      <motion.div
        className={styles.alphaLogo}
        animate={{ rotate: [60, 420], y: ["-10%", "-30%"] }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 18,
            delay: 0,
            repeatDelay: 0,
            ease: "linear",
          },
          y: {
            yoyo: Infinity,
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
          yoyo: Infinity,
          duration: 3,
          ease: "easeInOut",
          delay: 0,
          repeatDelay: 0,
        }}
      >
        <img
          alt="alpha logo shadwo"
          src={"/assets/branding/alpha-shadow.svg"}
        />
      </motion.div>
    </div>
  );
};
