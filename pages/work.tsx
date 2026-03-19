import React from "react";
import { motion } from "framer-motion";
import styles from "./styles/work.module.css";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { useAppContext } from "../src/providers/AppContext";
import { Router } from "next/router";
import Head from "next/head";

import {
  Container,
  Heading,
  GridItem,
  Stack,
  Grid,
  Button,
  SimpleGrid,
  useBreakpointValue,
} from "@chakra-ui/react";

/**
 * Work page — uses a CSS transition approach for the morph, unlike About/Contact
 * which use useMorphTransition for a vertical FLIP animation.
 *
 * WHY DIFFERENT:
 * The Work link on the Home page is rotated -90deg and positioned on the right edge.
 * A vertical morph doesn't make sense here — instead, the title slides horizontally
 * from its Home position (right:10vh) to its final position (right:95vw) using a
 * CSS `transition` on the `right` property.
 *
 * MORPH FLOW:
 * 1. hasNavTransition captures whether navTransitionRect existed at mount time
 * 2. If true: rightPos starts at "10vh" (matching Home position), titleExpanded=true
 * 3. Double requestAnimationFrame trick ensures the browser paints the start position
 *    before we set rightPos to "95vw", triggering the CSS transition
 * 4. After 650ms: titleExpanded=false collapses characters, navTransitionRect cleared
 *
 * DOUBLE-rAF TRICK:
 * A single rAF can batch with React's commit phase. Two nested rAFs guarantee the
 * browser has painted at least one frame with the initial position, so the CSS
 * transition actually animates instead of snapping.
 */
export default function Work() {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  // Capture once at mount — don't react to later changes
  const [hasNavTransition] = React.useState(!!appCtx.navTransitionRect);
  const [titleExpanded, setTitleExpanded] = React.useState(hasNavTransition);
  // Start at Home's position if arriving via nav, otherwise at final position
  const [rightPos, setRightPos] = React.useState(hasNavTransition ? "10vh" : "95vw");

  React.useEffect(() => {
    if (hasNavTransition) {
      // Double rAF ensures browser paints the start position before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setRightPos("95vw"); // Triggers CSS transition to final position
        });
      });
      // Collapse characters + clear transition rect after the slide completes
      const t = setTimeout(() => {
        setTitleExpanded(false);
        appCtx.setNavTransitionRect(null);
      }, 650);
      return () => clearTimeout(t);
    }
  }, []);

  // Hide title when navigating away (same pattern as About/Contact)
  React.useEffect(() => {
    const routeChangeCallback = () => setOpen(false);
    Router.events.on("beforeHistoryChange", routeChangeCallback);
    return () => {
      Router.events.off("beforeHistoryChange", routeChangeCallback);
    };
  }, []);

  const workFontSize =
    useBreakpointValue({ base: "2.5rem", md: "3rem" }) || "2.5rem";

  return (
    <>
      <Head>
        <title>Work - Arsh Sekhon</title>
      </Head>
      {Open && (
        <div
          style={{
            position: "fixed",
            top: "50vh",
            right: rightPos,
            transform: "translateX(50%) translateY(-50%)",
            transition: hasNavTransition ? "right 0.6s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          }}
        >
          <div>
            <Navlink
              fontSize={workFontSize}
              text="Work"
              href="/work"
              enabled={true}
              style={{
                transform: "rotate(-90deg)",
                position: "relative",
                right: "0%",
                top: "50%",
              }}
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
          maxW="60vw"
          margin={{ base: "auto 0 auto 10vw", md: "auto 0 auto 5vw" }}
          width="70vw"
        >
          <Grid
            gap={2}
            rowGap={20}
            columnGap={10}
            justifyContent="space-evenly"
            alignContent="center"
            alignItems="center"
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          >
            <GridItem>
              <Stack textAlign="center" gap={5}>
                <Heading fontSize={{ base: "2rem", md: "2.5rem" }}>
                  ME AS A DEVELOPER.
                </Heading>
                <div style={{ height: "200px", verticalAlign: "middle" }}>
                  <img
                    style={{ margin: "auto", height: "100%" }}
                    className="category D"
                    src="assets/socials/github.svg"
                  />
                </div>
                <div>
                  <a href="https://github.com/arshsekhon" target="_blank">
                    <Button
                      css={{
                        transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
                        border: "2px solid #000",
                        fontSize: "1rem",
                        borderRadius: "2px",
                        width: "100%",
                        maxWidth: "15em",
                        background: "#000",
                        color: "#fff",
                        cursor: "pointer",
                        "&:hover": { background: "#fff", color: "#000" },
                      }}
                    >
                      Explore Projects
                    </Button>
                  </a>
                </div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack textAlign="center" gap={5} alignContent="center">
                <Heading fontSize={{ base: "2rem", md: "2.5rem" }}>
                  ME AS A DESIGNER.
                </Heading>
                <div style={{ height: "200px", verticalAlign: "middle" }}>
                  <img
                    style={{ margin: "auto", height: "100%" }}
                    className="category D"
                    src="assets/socials/Be.svg"
                  />
                </div>
                <div>
                  <a
                    href="https://www.behance.net/arshsekhonea7f"
                    target="_blank"
                  >
                    <Button
                      css={{
                        transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
                        border: "2px solid #000",
                        fontSize: "1rem",
                        borderRadius: "2px",
                        width: "100%",
                        maxWidth: "15em",
                        background: "#000",
                        color: "#fff",
                        cursor: "pointer",
                        "&:hover": { background: "#fff", color: "#000" },
                      }}
                    >
                      Explore Designs
                    </Button>
                  </a>
                </div>
              </Stack>
            </GridItem>
          </Grid>
        </Container>
      </motion.div>
    </>
  );
}
