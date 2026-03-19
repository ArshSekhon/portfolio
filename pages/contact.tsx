import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
import useWindowSize from "../src/hooks/useWindowSize";
import Head from "next/head";

import { Container, Text, Stack, Box, Button, HStack } from "@chakra-ui/react";

import styles from "./styles/contact.module.css";
import ContactForm from "../src/components/ContactForm/ContactForm";
import { useAppContext } from "../src/providers/AppContext";
import useMorphTransition from "../src/hooks/useMorphTransition";

const ContactOptions = () => {
  return (
    <>
      <HStack gap={5}>
        <div className={styles.socialIcon}>
          <a target="_blank" href="https://www.linkedin.com/in/arsh-sekhon/">
            <img src="/assets/socials/linkedin.svg" alt="linkedin_icon" />
          </a>
        </div>
        <div className={styles.socialIcon}>
          <a target="_blank" href="http://github.com/arshsekhon">
            <img src="/assets/socials/github.svg" alt="github_icon" />
          </a>
        </div>
        <div className={styles.socialIcon}>
          <a target="_blank" href="https://www.instagram.com/sincerely_arsh/">
            <img src="/assets/socials/insta.svg" alt="insta_icon" />
          </a>
        </div>
        <div className={styles.socialIcon}>
          <a target="_blank" href="https://twitter.com/sekhon_arsh_">
            <img src="/assets/socials/twitter.svg" alt="twitter_icon" />
          </a>
        </div>
      </HStack>
    </>
  );
};

/**
 * ContactPage — same morph transition pattern as AboutPage.
 *
 * MORPH INTEGRATION:
 * - titleExpanded starts true if navTransitionRect exists (arrived via Home nav click).
 * - useMorphTransition animates the title from the captured Home position to its
 *   final position, then collapses character spacing via setTitleExpanded(false).
 *
 * EXIT PATTERN:
 * - beforeHistoryChange sets Open=false to hide the title during route transitions.
 *
 * CONTENT ENTRANCE:
 * - Body content always fades in with 1.3s delay (unlike About which checks introViewed).
 *
 * See AboutPage and useMorphTransition for detailed documentation of the pattern.
 */
export default function ContactPage() {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  // Start expanded if we arrived via nav click (morph in progress)
  const [titleExpanded, setTitleExpanded] = React.useState(!!appCtx.navTransitionRect);
  const [contactFormOpen, setContactFormOpen] = React.useState(false);

  // Attach morph ref; onComplete collapses expanded characters
  const morphRef = useMorphTransition(0.6, () => {
    setTitleExpanded(false);
  });

  // Hide title when navigating away
  React.useEffect(() => {
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
        <title>Contact - Arsh Sekhon</title>
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
          <Navlink
            text="Contact"
            href="/contact"
            enabled={false}
            isExpanded={titleExpanded}
          />
        </div>
      )}
      <Container
        maxW="none"
        minH="300px"
        alignItems="center"
        justifyContent="flex-start"
        marginTop="5vh"
      >
        <motion.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <Stack gap={10} align="center">
            {!contactFormOpen && (
              <>
                <h1 className={styles.sayHello}>Say Hello!</h1>
                <Button
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  border="2px"
                  fontSize="1rem"
                  borderRadius="2px"
                  padding="1em 5em"
                  bg="#000"
                  borderColor="#000"
                  color="#fff"
                  _hover={{ bg: "#fff", color: "#000" }}
                  _active={{
                    borderColor: "#000",
                  }}
                  onClick={() => {
                    setContactFormOpen(true);
                  }}
                  maxW="none"
                  _focus={{
                    boxShadow:
                      "0 0 1px 2px rgba(0, 0, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)",
                  }}
                >
                  SEND MESSAGE
                </Button>
                <ContactOptions />
              </>
            )}
            {contactFormOpen && (
              <ContactForm
                closeForm={() => {
                  setContactFormOpen(false);
                }}
              />
            )}
          </Stack>
        </motion.div>
      </Container>
    </>
  );
}
