import React, { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import AlphaLogoWithShadow from "../branding/AlphaLogoWithShadow/AlphaLogoWithShadow";

import styles from "./Home.module.css";
import Navlink from "../navigation/Navlink/Navlink";

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

const MobileNav = () => {
  return (
    <div>
      <div>
        <motion.div
          style={{
            position: "fixed",
            left: "50vw",
          }}
          transformTemplate={({ x }) => `translateX(${x})`}
          initial={{ opacity: 0, top: "0%", x: "-50%" }}
          animate={{ opacity: 1, top: "6%", x: "-50%" }}
          transition={{ duration: 1 }}
          layoutId="contact-HomeNavLink"
        >
          <Navlink
            style={{ fontSize: "1.5rem" }}
            text="Contact"
            href="/contact"
            enabled={true}
          />
        </motion.div>
      </div>
      <div>
        <motion.div
          style={{
            position: "fixed",
            left: "50vw",
          }}
          transformTemplate={({ x }) => `translateX(${x})`}
          initial={{ opacity: 0, bottom: "0%", x: "-50%" }}
          animate={{ opacity: 1, bottom: "6%", x: "-50%" }}
          transition={{ duration: 1 }}
          layoutId="about-HomeNavLink"
        >
          <Navlink
            style={{ fontSize: "1.5rem" }}
            text="About"
            href="/about"
            enabled={true}
          />
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
              transform: "translate(45%,-50%) rotate(-90deg)",
            }}
          >
            <Navlink
              style={{ fontSize: "2rem" }}
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

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export default function Home() {
  const [width, height] = useWindowSize();
  return (
    <div>
      <header>
        <nav>
          <div className={styles.desktopNavContainer}>
            {width >= 600 && <DesktopNav />}
          </div>
          <div className={styles.mobileNavContainer + " mobile-nav"}>
            {width < 600 && <MobileNav />}
          </div>
        </nav>
      </header>
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
