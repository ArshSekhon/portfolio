import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
import useWindowSize from "../src/hooks/useWindowSize";
import { Container, Stack } from "@chakra-ui/react";
import Head from "next/head";
import styles from "./styles/about.module.css";
import { useAppContext } from "../src/providers/AppContext";

import Markdown from "react-markdown";
import useMorphTransition from "../src/hooks/useMorphTransition";

/**
 * AboutPage — entry animation integrates with the morph transition system.
 *
 * MORPH INTEGRATION:
 * - titleExpanded starts true if navTransitionRect exists (arrived via Home nav click),
 *   so the title Navlink renders with expanded character spacing matching the Home state.
 * - useMorphTransition animates the title container from the captured source position
 *   to its natural position, then calls onComplete -> setTitleExpanded(false) to collapse
 *   the characters back to normal spacing.
 * - On direct navigation (no navTransitionRect), titleExpanded starts false = no morph.
 *
 * EXIT PATTERN:
 * - `Open` state controls whether the title is rendered.
 * - On beforeHistoryChange (user navigates away), Open is set to false,
 *   removing the title so it doesn't flash during page transition.
 *
 * CONTENT ENTRANCE:
 * - The body content fades in with a delay of 1.3s if introViewed is true
 *   (gives morph animation time to complete), or 0s on first visit.
 */
export default function AboutPage({ aboutMeMarkdown }) {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  // Start expanded if we arrived via nav click (morph transition in progress)
  const [titleExpanded, setTitleExpanded] = React.useState(!!appCtx.navTransitionRect);

  // Attach morph ref to the title container; onComplete collapses character spacing
  const morphRef = useMorphTransition(0.6, () => {
    setTitleExpanded(false);
  });

  // Hide the title when navigating away to prevent visual flash
  React.useEffect(() => {
    const routeChangeCallback = () => setOpen(false);
    Router.events.on("beforeHistoryChange", routeChangeCallback);
    return () => {
      Router.events.off("beforeHistoryChange", routeChangeCallback);
    };
  }, []);

  // don't remove
  const [width, height] = useWindowSize();

  const markdownTheme = {
    a: (props) => (
      <a href={props.href} style={{ color: "#0755a5", textDecoration: "underline" }}>
        {props.children}
      </a>
    ),
    p: (props) => (
      <p style={{ marginBottom: "1em", lineHeight: 1.7, fontSize: "1rem" }}>{props.children}</p>
    ),
    h1: (props) => (
      <h1 style={{ fontSize: "2.2rem", fontWeight: 700, marginTop: "1.5em", marginBottom: "0.5em", color: "#1a1a2e" }}>{props.children}</h1>
    ),
    h2: (props) => (
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginTop: "2em", marginBottom: "0.6em", color: "#1a1a2e" }}>{props.children}</h2>
    ),
    h3: (props) => (
      <h3 style={{ fontSize: "1.4rem", fontWeight: 600, marginTop: "1.5em", marginBottom: "0.5em", color: "#1a1a2e" }}>{props.children}</h3>
    ),
    ul: (props) => (
      <ul style={{ paddingLeft: "1.5em", marginBottom: "1em", listStyleType: "disc" }}>{props.children}</ul>
    ),
    ol: (props) => (
      <ol style={{ paddingLeft: "1.5em", marginBottom: "1em", listStyleType: "decimal" }}>{props.children}</ol>
    ),
    li: (props) => (
      <li style={{ marginBottom: "0.4em", lineHeight: 1.7 }}>{props.children}</li>
    ),
    hr: () => (
      <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "2em 0" }} />
    ),
    strong: (props) => (
      <strong style={{ fontWeight: 700 }}>{props.children}</strong>
    ),
  };

  return (
    <>
      <Head>
        <title>About Me - Arsh Sekhon</title>
        <meta
          name="description"
          content="Hey There! I'm  Arsh Sekhon, an experienced Software Developer 
          with several years of experience developing enterprise scale software.
          I started out as a Graphics Designer, so I have a keen eye for detail and 
          design in the work I produce."
        />
      </Head>
      {Open && (
        <div ref={morphRef}>
          <div>
            <Navlink
              text="About"
              href="/about"
              enabled={false}
              isExpanded={titleExpanded}
            />
          </div>
        </div>
      )}
      <motion.div
        initial={{ y: "10%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "10%", opacity: 0 }}
        transition={{ delay: appCtx.data.introViewed ? 1.3 : 0, duration: 1 }}
      >
        <Container
          maxW="680px"
          margin="5vh auto 10vh"
          paddingX={{ base: "5%", md: "0" }}
        >
          <Stack gap={3} alignItems="flex-start">
            <div className={styles.helloAbout}>Hello,</div>
            <div>
              <Markdown components={markdownTheme}>
                {aboutMeMarkdown}
              </Markdown>
            </div>
          </Stack>
        </Container>
      </motion.div>
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
