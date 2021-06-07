import React from "react";
import { motion } from "framer-motion";
import AlphaLogoWithShadow from "../branding/AlphaLogoWithShadow/AlphaLogoWithShadow";

import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, left: "0%" }}
        animate={{ opacity: 1, left: "7%" }}
        transition={{ duration: 1 }}
        className={styles.nameBannerContainer}
      >
        <img
          src="/assets/branding/name-banner.svg"
          className={styles.nameBanner}
        />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <AlphaLogoWithShadow />
      </motion.div>
    </div>
  );
}
