import React from "react";
import { motion } from "framer-motion";
import AlphaLogoWithShadow from "../branding/AlphaLogoWithShadow/AlphaLogoWithShadow";

import styles from "./Home.module.css";
import HorizontalStrikeoutLink from "../navigation/Navlink/Navlink";
import Navlink from "../navigation/Navlink/Navlink";
import HomeNavigation from "../navigation/HomeNavigation/HomeNavigation";

const DesktopNav = () => {
  return (
    <div>
      <div>
        <motion.div
          style={{
            position: "fixed",
            right: "15%",
          }}
          initial={{ opacity: 0, bottom: "0%" }}
          animate={{ opacity: 1, bottom: "6%" }}
          transition={{ duration: 1 }}
          layoutId="contact-HomeNavLink"
        >
          <Navlink text="Contact" href="/contact" enabled={true} />
        </motion.div>
      </div>
      <div>
        <motion.div
          style={{
            position: "fixed",
            left: "25%",
          }}
          initial={{ opacity: 0, bottom: "0%" }}
          animate={{ opacity: 1, bottom: "6%" }}
          transition={{ duration: 1 }}
          layoutId="about-HomeNavLink"
        >
          <Navlink text="About" href="/about" enabled={true} />
        </motion.div>
      </div>
      <div>
        <motion.div
          style={{
            position: "fixed",
            top: "50vh",
          }}
          initial={{ opacity: 0, right: "-4%" }}
          animate={{ opacity: 1, right: "4%" }}
          transition={{ duration: 1 }}
          layoutId="work-HomeNavLink"
        >
          <div
            style={{
              transform: "translate(50%,-50%) rotate(-90deg)",
            }}
          >
            <Navlink
              style={{ fontSize: "4rem" }}
              text="Works"
              href="/work"
              enabled={true}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <DesktopNav />
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
    </div>
  );
}
