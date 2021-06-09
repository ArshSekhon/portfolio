import React from "react";
import { motion } from "framer-motion";
import AlphaLogoWithShadow from "../branding/AlphaLogoWithShadow/AlphaLogoWithShadow";

import styles from "./Home.module.css";
import HorizontalStrikeoutLink from "../layouts/Navlink/Navlink";
import Navlink from "../layouts/Navlink/Navlink";

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
      <motion.div
        style={
          false
            ? {
                position: "fixed",
                left: "50%",
                translateX: "-50%",
              }
            : {
                position: "fixed",
                right: "15%",
              }
        }
        initial={
          false ? { opacity: 0, top: "0%" } : { opacity: 0, bottom: "0%" }
        }
        animate={
          false ? { opacity: 1, top: "4%" } : { opacity: 1, bottom: "4%" }
        }
        transition={{ duration: 1 }}
        layoutId="contact-link"
      >
        <Navlink text="Contact" href="/contact" enabled={true} />
      </motion.div>
    </div>
  );
}
