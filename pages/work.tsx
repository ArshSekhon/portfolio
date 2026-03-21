import React, { useRef } from "react";
import { motion, animate as fmAnimate } from "framer-motion";
import { useAppContext } from "../src/providers/AppContext";
import { Router } from "next/router";
import Head from "next/head";
import styles from "./styles/work.module.css";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { useBreakpointValue } from "@chakra-ui/react";

const DISCIPLINES = [
  {
    number: "01",
    title: "The Weblog",
    subtitle: "CS, Keyboards, Science, & Essays",
    href: "https://arshsekhon.substack.com/",
  },
  {
    number: "02",
    title: "Code",
    subtitle: "Open Source Projects & Code",
    href: "https://github.com/arshsekhon",
  },
  {
    number: "03",
    title: "Design & Visuals",
    subtitle: "UI/UX, Branding, & Behance",
    href: "https://www.behance.net/arshsekhonea7f",
  },
];

const ArrowIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function Work() {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  const [hasNavTransition] = React.useState(!!appCtx.navTransitionRect);
  const [titleExpanded, setTitleExpanded] = React.useState(hasNavTransition);
  const workTitleRef = useRef<HTMLDivElement>(null);

  // GPU-accelerated morph: slide from Home position to final position
  React.useLayoutEffect(() => {
    if (!hasNavTransition || !workTitleRef.current) return;

    const el = workTitleRef.current;
    const sourceRect = appCtx.navTransitionRect;
    if (!sourceRect) return;

    // Skip morph on mobile — sidebar is hidden via CSS
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setTitleExpanded(false);
      appCtx.setNavTransitionRect(null);
      return;
    }

    const targetRect = el.getBoundingClientRect();
    const sourceCenterX = sourceRect.left + sourceRect.width / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const deltaX = sourceCenterX - targetCenterX;

    el.style.visibility = "hidden";
    el.style.transform = `translateY(-50%) translateX(${deltaX}px)`;
    el.getBoundingClientRect();
    el.style.visibility = "visible";

    const controls = fmAnimate(deltaX, 0, {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v) => {
        el.style.transform = `translateY(-50%) translateX(${v}px)`;
      },
      onComplete: () => {
        el.style.transform = "translateY(-50%)";
        setTitleExpanded(false);
        appCtx.setNavTransitionRect(null);
      },
    });

    return () => {
      controls.stop();
      el.style.transform = "translateY(-50%)";
    };
  }, []);

  React.useEffect(() => {
    if (hasNavTransition && !workTitleRef.current) {
      // Fallback if ref not available
      const t = setTimeout(() => {
        setTitleExpanded(false);
        appCtx.setNavTransitionRect(null);
      }, 650);
      return () => clearTimeout(t);
    }
  }, []);

  React.useEffect(() => {
    const routeChangeCallback = () => setOpen(false);
    Router.events.on("beforeHistoryChange", routeChangeCallback);
    return () => {
      Router.events.off("beforeHistoryChange", routeChangeCallback);
    };
  }, []);

  React.useEffect(() => {
    if (appCtx.isExiting) {
      setTitleExpanded(true);
      const t = setTimeout(() => appCtx.completeExit(), 600);
      return () => clearTimeout(t);
    }
  }, [appCtx.isExiting]);

  const workFontSize =
    useBreakpointValue({ base: "2.5rem", md: "3rem" }) || "2.5rem";

  return (
    <>
      <Head>
        <title>Work - Arsh Sekhon</title>
      </Head>

      {/* Left vertical "Work" text with strikethrough */}
      {Open && (
        <div ref={workTitleRef} className={styles.verticalText}>
          <motion.div
            animate={appCtx.isExiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Navlink
              fontSize={workFontSize}
              text="Work"
              href="/work"
              enabled={false}
              style={{
                transform: "rotate(-90deg)",
                position: "relative",
              }}
              isExpanded={titleExpanded}
            />
          </motion.div>
        </div>
      )}

      {/* Main content */}
      <motion.div
        initial={{ y: "10%", opacity: 0 }}
        animate={
          appCtx.isExiting
            ? { y: "10%", opacity: 0 }
            : { y: 0, opacity: 1 }
        }
        transition={{
          delay: !appCtx.isExiting && appCtx.data.introViewed ? 1.3 : 0,
          duration: appCtx.isExiting ? 0.4 : 1,
        }}
        className={styles.pageContainer}
      >
        <div className={styles.indexContainer}>
          {/* Index Header */}
          <div className={styles.indexHeader}>
            <div className={styles.colNumber}>No.</div>
            <div className={styles.colDiscipline}>Discipline</div>
            <div className={styles.colAction}>Action</div>
          </div>

          {/* Rows */}
          {DISCIPLINES.map((d, i) => (
            <a
              key={i}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.indexRow}
            >
              <div className={styles.rowNumber}>{d.number}</div>
              <div className={styles.rowContent}>
                <h2 className={styles.rowTitle}>{d.title}</h2>
                <p className={styles.rowSubtitle}>{d.subtitle}</p>
              </div>
              <div className={styles.rowArrow}>
                <ArrowIcon />
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
