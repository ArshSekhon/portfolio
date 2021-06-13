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
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

export default function AboutPage({ aboutMeMarkdown }) {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  const [titleExpanded, setTitleExpanded] = React.useState(true);

  React.useEffect(() => {
    setTimeout(
      () => {
        setTitleExpanded(false);
      },
      appCtx.data.introViewed ? 1100 : 0
    );

    const routeChangeCallback = () => setOpen(false);
    Router.events.on("beforeHistoryChange", routeChangeCallback);
    return () => {
      Router.events.off("beforeHistoryChange", routeChangeCallback);
    };
  }, []);

  // don't remove
  const [width, height] = useWindowSize();

  const markdownTheme = {
    a: (props) => {
      const { children } = props;
      return (
        <a
          href={props.href}
          style={{ color: "#0755a5", textDecoration: "underline" }}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <>
      <Head>
        <title>About Me - Arsh Sekhon</title>
      </Head>
      {Open && (
        <div>
          <motion.div transition={{ duration: 1 }} layoutId="about-HomeNavLink">
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
        initial={{ y: "10%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "10%", opacity: 0 }}
        transition={{ delay: appCtx.data.introViewed ? 1.3 : 0, duration: 1 }}
      >
        <Container
          maxW={{
            base: "container.sm",
            sm: "container.sm",
            xl: "container.lg",
          }}
          margin="5vh 0 10vh"
          paddingX="10%"
        >
          <Stack spacing={3} alignItems="flex-start">
            <div className={styles.helloAbout}>Hello,</div>
            <div>
              <Markdown components={ChakraUIRenderer(markdownTheme)}>
                {aboutMeMarkdown}
              </Markdown>
            </div>
          </Stack>
        </Container>
      </motion.div>
    </>
  );
}

export const getServerSideProps = async () => {
  const aboutMeMarkdown = await fetch(
    "https://raw.githubusercontent.com/MykalMachon/MykalMachon/master/README.md"
  ).then((data) => data.text());

  return { props: { aboutMeMarkdown } };
};
