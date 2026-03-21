import React, { useEffect, useLayoutEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import AlphaLogoWithShadow from "../branding/AlphaLogoWithShadow/AlphaLogoWithShadow";

import styles from "./Home.module.css";
import Navlink from "../navigation/Navlink/Navlink";
import useWindowSize from "../../hooks/useWindowSize";
import { useBreakpointValue } from "@chakra-ui/react";

/**
 * DesktopNav — horizontal layout with About/Contact at bottom, Work rotated on the right.
 *
 * Each link has its own useAnimation control. When a link is clicked:
 * 1. onNavigate() fires first (fades logo + name banner in parent)
 * 2. The clicked link animates to center (fixed, left:50vw, x:-50%)
 * 3. The other links fade out in different directions
 * After the Navlink's navigationDelay (500ms), the rect is captured and route pushed.
 */
const DesktopNav = ({ onNavigate }) => {
  const contactContainerAnimationControl = useAnimation();
  const aboutContainerAnimationControl = useAnimation();
  const workContainerAnimationControl = useAnimation();

  const onContactClick = () => {
    if (onNavigate) onNavigate();
    contactContainerAnimationControl.start({
      x: "-50%",
      left: "50vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    aboutContainerAnimationControl.start({
      left: "0vw",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const onAboutClick = () => {
    if (onNavigate) onNavigate();
    aboutContainerAnimationControl.start({
      x: "-50%",
      left: "50vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    contactContainerAnimationControl.start({
      opacity: 0,
      left: "100vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const onWorkClick = () => {
    if (onNavigate) onNavigate();
    aboutContainerAnimationControl.start({
      opacity: 0,
      y: "100%",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    contactContainerAnimationControl.start({
      opacity: 0,
      y: "100%",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const workFontSize =
    useBreakpointValue({ base: "2.5rem", md: "3rem" }) || "2.5rem";

  return (
    <div>
      <motion.div
        animate={contactContainerAnimationControl}
        style={{
          position: "fixed",
          left: "75vw",
          x: "-50%",
          bottom: "6%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
          left: "30vw",
          x: "-50%",
          bottom: "6%",
        }}
        animate={aboutContainerAnimationControl}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
          right: "10vh",
          x: "50%",
          y: "-50%",
        }}
        animate={workContainerAnimationControl}
      >
        <motion.div
          initial={{ opacity: 0, x: 100, position: "relative" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Navlink
            fontSize={workFontSize}
            text="Work"
            href="/work"
            enabled={true}
            onClick={onWorkClick}
            style={{
              transform: "rotate(-90deg)",
              position: "relative",
              right: "0%",
              top: "50%",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * MobileNav — vertical layout with Contact at top, About at bottom, Work on the right.
 * Same animation pattern as DesktopNav but with mobile-appropriate directions
 * (vertical slides instead of horizontal for non-clicked links).
 */
const MobileNav = ({ onNavigate }) => {
  const contactContainerAnimationControl = useAnimation();
  const aboutContainerAnimationControl = useAnimation();
  const workContainerAnimationControl = useAnimation();

  const onContactClick = () => {
    if (onNavigate) onNavigate();
    contactContainerAnimationControl.start({
      x: "-50%",
      left: "50vw",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    aboutContainerAnimationControl.start({
      y: "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const onAboutClick = () => {
    if (onNavigate) onNavigate();
    aboutContainerAnimationControl.start({
      transition: { duration: 0.4, ease: "easeOut" },
    });

    contactContainerAnimationControl.start({
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const onWorkClick = () => {
    if (onNavigate) onNavigate();
    contactContainerAnimationControl.start({
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.4, ease: "easeOut" },
    });

    aboutContainerAnimationControl.start({
      y: "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    });

    workContainerAnimationControl.start({
      opacity: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const workFontSize =
    useBreakpointValue({ base: "2.5rem", md: "3rem" }) || "2.5rem";

  return (
    <div>
      <motion.div
        animate={contactContainerAnimationControl}
        style={{
          position: "fixed",
          left: "50vw",
          top: "15%",
          x: "-50%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
          left: "50vw",
          bottom: "15%",
          x: "-50%",
        }}
        animate={aboutContainerAnimationControl}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
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
          right: "5vh",
          x: "50%",
          y: "-50%",
        }}
        animate={workContainerAnimationControl}
      >
        <motion.div
          initial={{ opacity: 0, x: 100, position: "relative" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Navlink
            fontSize={workFontSize}
            text="Work"
            href="/work"
            enabled={true}
            onClick={onWorkClick}
            style={{
              transform: "rotate(-90deg)",
              position: "relative",
              right: "0%",
              top: "50%",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

/**
 * Home — main landing page component with coordinated exit animations.
 *
 * ANIMATION SEQUENCE when a nav link is clicked:
 * 1. Navlink.onClick fires -> isClicked=true -> characters expand (letter-spacing widens)
 * 2. customOnClick (e.g. onAboutClick) fires:
 *    a. onNavigate() -> logo and name banner fade up and out
 *    b. Clicked link centers on screen (position:fixed, left:50vw)
 *    c. Other links fade out in various directions
 * 3. After Navlink's navigationDelay (500ms default):
 *    a. Navlink captures its bounding rect -> appCtx.navTransitionRect
 *    b. router.push(href) triggers Next.js navigation
 * 4. Destination page renders, useMorphTransition reads the stored rect and
 *    animates the title from the captured position to its final position.
 */
export default function Home() {
  const [width, height] = useWindowSize();

  // Controls for fading out non-nav elements during the exit sequence
  const nameBannerAnimationControl = useAnimation();
  const alphaLogoAnimationControl = useAnimation();

  /** Called by both DesktopNav and MobileNav when any link is clicked. Fades out logo + banner. */
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
          <div>
            {/* Render DesktopNav or MobileNav based on window width (not CSS media query,
              because the animation controls differ between layouts) */}
          {(width && width > 768) && <DesktopNav onNavigate={onNavigate} />}
          </div>
          <div>{width && width <= 768 && <MobileNav onNavigate={onNavigate} />}</div>
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
