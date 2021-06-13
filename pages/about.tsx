import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
import useWindowSize from "../src/hooks/useWindowSize";
import { Container, Stack } from "@chakra-ui/react";
import Head from "next/head";
import styles from "./styles/about.module.css";
import { useAppContext } from "../src/providers/AppContext";

import ReactMarkdown from "react-markdown";

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
        <Container maxW="container.lg" margin="5vh 0 10vh" paddingX="10%">
          <Stack spacing={3} alignItems="flex-start">
            <div className={styles.helloAbout}>Hello,</div>
            <div>
              <ReactMarkdown>{aboutMeMarkdown}</ReactMarkdown>
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
