import React, { useState } from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
import useWindowSize from "../src/hooks/useWindowSize";
import Head from "next/head";
import styles from "./styles/about.module.css";
import { useAppContext } from "../src/providers/AppContext";
import Markdown from "react-markdown";
import useMorphTransition from "../src/hooks/useMorphTransition";

const sectionMdComponents = {
  a: (props) => (
    <a href={props.href} target={props.href?.startsWith("http") ? "_blank" : undefined}
      style={{ color: "#0755a5", textDecoration: "underline" }}>
      {props.children}
    </a>
  ),
  p: (props) => (
    <p style={{ marginBottom: "1em", lineHeight: 1.8, fontSize: "1.05rem" }}>{props.children}</p>
  ),
  h1: (props) => (
    <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.6em", color: "#000" }}>{props.children}</h1>
  ),
  h2: (props) => (
    <h2 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.6em", color: "#000" }}>{props.children}</h2>
  ),
  h3: (props) => (
    <h3 style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: "0.5em", color: "#1a1a2e" }}>{props.children}</h3>
  ),
  ul: (props) => (
    <ul style={{ paddingLeft: "1.5em", marginBottom: "1em", listStyleType: "disc" }}>{props.children}</ul>
  ),
  ol: (props) => (
    <ol style={{ paddingLeft: "1.5em", marginBottom: "1em", listStyleType: "decimal" }}>{props.children}</ol>
  ),
  li: (props) => (
    <li style={{ marginBottom: "0.5em", lineHeight: 1.8 }}>{props.children}</li>
  ),
  hr: () => null,
  strong: (props) => (
    <strong style={{ fontWeight: 700, color: "#000" }}>{props.children}</strong>
  ),
};

export default function AboutPage({ aboutMeMarkdown }) {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  const [titleExpanded, setTitleExpanded] = React.useState(!!appCtx.navTransitionRect);

  const morphRef = useMorphTransition(0.6, () => {
    setTitleExpanded(false);
  });

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

  // don't remove
  const [width, height] = useWindowSize();

  const sections = aboutMeMarkdown
    ? aboutMeMarkdown.split(/\n---\n/).map((s) => s.trim()).filter(Boolean)
    : [];

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <Head>
        <title>About Me - Arsh Sekhon</title>
        <meta name="description" content="About Arsh Sekhon" />
      </Head>

      <div className={styles.page}>
        {Open && (
          <div ref={morphRef} className={styles.navTitle}>
            <motion.div
              animate={appCtx.isExiting ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Navlink
                text="About"
                href="/about"
                enabled={false}
                isExpanded={titleExpanded}
              />
            </motion.div>
          </div>
        )}

        <motion.div
          className={styles.snapContainer}
          initial={{ opacity: 0 }}
          animate={appCtx.isExiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{
            delay: !appCtx.isExiting && appCtx.data.introViewed ? 1.3 : 0,
            duration: appCtx.isExiting ? 0.4 : 0.8,
          }}
        >
          {sections.map((section, i) => (
            <section key={i} className={styles.slide}>
              <motion.div
                className={`${styles.slideContent} ${i === sections.length - 1 ? styles.lastSlide : ""}`}
                initial={{ opacity: 0, y: width && width <= 768 ? 20 : 0 }}
                whileInView={{ opacity: 1, y: 0 }}
                onViewportEnter={() => setActiveSlide(i)}
                viewport={{ once: !!(width && width <= 768), amount: width && width <= 768 ? 0.1 : 0.6 }}
                transition={{ duration: width && width <= 768 ? 0.6 : 0.4 }}
              >
                {i === 0 && <div className={styles.helloAbout}>Hello,</div>}
                <Markdown components={sectionMdComponents}>{section}</Markdown>
              </motion.div>
            </section>
          ))}

          {/* Slide indicator — right side */}
          <div className={styles.indicator}>
            {sections.map((_, i) => (
              <div
                key={i}
                className={`${styles.dot} ${i === activeSlide ? styles.dotActive : ""}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export const getStaticProps = async (context) => {
  const url = process.env.NEXT_PUBLIC_ABOUT_MARKDOWN_URL;
  let aboutMeMarkdown = "";

  if (url) {
    aboutMeMarkdown = await fetch(url).then((data) => data.text());
  }

  return { props: { aboutMeMarkdown } };
};
