import React, { useEffect, useLayoutEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AlphaLogoWithShadow from "../branding/AlphaLogoWithShadow/AlphaLogoWithShadow";

import styles from "./Home.module.css";
import Navlink from "../navigation/Navlink/Navlink";
import useWindowSize from "../../hooks/useWindowSize";

const DesktopNav = ({ onNavigate }) => {
  const contactContainerAnimationControl = useAnimation();
  const aboutContainerAnimationControl = useAnimation();
  const workContainerAnimationControl = useAnimation();

  const onContactClick = () => {
    if (onNavigate) onNavigate();
    contactContainerAnimationControl.start({
      position: "fixed",
      x: "-50%",
      left: "50vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    aboutContainerAnimationControl.start({
      position: "fixed",
      left: "0vw",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      position: "fixed",
      right: "-5vw",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    });
  };

  const onAboutClick = () => {
    if (onNavigate) onNavigate();
    aboutContainerAnimationControl.start({
      position: "fixed",
      x: "-50%",
      left: "50vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    contactContainerAnimationControl.start({
      position: "fixed",
      opacity: 0,
      left: "100vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      position: "fixed",
      right: "-5vw",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    });
  };

  return (
    <div>
      <motion.div
        animate={contactContainerAnimationControl}
        style={{
          position: "fixed",
          left: "60vw",
          bottom: "6%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          layoutId="contact-HomeNavLink"
        >
          <Navlink
            text="Contact"
            href="/contact"
            enabled={true}
            onClick={onContactClick}
          />
        </motion.div>
      </motion.div>
      <motion.div
        style={{
          position: "fixed",
          left: "25%",
          bottom: "6%",
        }}
        animate={aboutContainerAnimationControl}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          layoutId="about-HomeNavLink"
        >
          <Navlink
            text="About"
            href="/about"
            enabled={true}
            onClick={onAboutClick}
          />
        </motion.div>
      </motion.div>
      <motion.div
        style={{
          position: "fixed",
          top: "50vh",
          right: "-4%",
          transform: "translate(0%,-50%)",
        }}
        animate={workContainerAnimationControl}
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          layoutId="work-HomeNavLink"
        >
          <div
            style={{
              transform: "rotate(-90deg)",
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
      </motion.div>
    </div>
  );
};

const MobileNav = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          width: "100vw",
          left: 0,
          textAlign: "center",
          top: "6%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, top: "0%" }}
          animate={{ opacity: 1, top: "6%" }}
          transition={{ duration: 1 }}
          layoutId="contact-HomeNavLink"
        >
          <Navlink
            style={{ fontSize: "1.5rem" }}
            text="Contact"
            href="/contact"
            enabled={true}
            expandedCharSpacing="12px"
          />
        </motion.div>
      </div>
      <div>
        <motion.div
          style={{
            position: "fixed",
            width: "100vw",
            left: 0,
            textAlign: "center",
          }}
          initial={{ opacity: 0, bottom: "0%" }}
          animate={{ opacity: 1, bottom: "6%" }}
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

export default function Home() {
  const [width, height] = useWindowSize();

  const nameBannerAnimationControl = useAnimation();
  const alphaLogoAnimationControl = useAnimation();

  const onNavigate = () => {
    alphaLogoAnimationControl.start({
      y: "-10%",
      opacity: 0,
      transition: { delay: 0.2, duration: 0.3, ease: "easeOut" },
    });

    nameBannerAnimationControl.start({
      y: "-10%",
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  return (
    <div>
      <header>
        <nav>
          <div className={styles.desktopNavContainer}>
            {width >= 768 && <DesktopNav onNavigate={onNavigate} />}
          </div>
          <div className={styles.mobileNavContainer + " mobile-nav"}>
            {width < 768 && <MobileNav />}
          </div>
        </nav>
      </header>
      <div>
        <motion.div
          animate={nameBannerAnimationControl}
          style={{ position: "fixed", left: "7vw" }}
          className={styles.nameBannerContainer}
        >
          <motion.div
            initial={{ opacity: 0, left: "0%" }}
            animate={{ opacity: 1, left: "7%" }}
            transition={{ duration: 1 }}
          >
            <img
              src="/assets/branding/name-banner.svg"
              className={styles.nameBanner}
            />
          </motion.div>
        </motion.div>
        <motion.div animate={alphaLogoAnimationControl}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AlphaLogoWithShadow />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
