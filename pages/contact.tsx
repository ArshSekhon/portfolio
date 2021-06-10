import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
import useWindowSize from "../src/hooks/useWindowSize";

import { Container, Text, Stack, Box, Button, HStack } from "@chakra-ui/react";

import styles from "./styles/contact.module.css";

export default function ContactPage() {
  const [Open, setOpen] = React.useState(true);
  const [titleExpanded, setTitleExpanded] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setTitleExpanded(false);
    }, 1100);
  }, []);

  Router.events.on("beforeHistoryChange", (route: string) => {
    setOpen(false);
  });

  const [width, height] = useWindowSize();

  return (
    <>
      {Open && (
        <div>
          <motion.div
            transition={{ duration: 1 }}
            layoutId="contact-HomeNavLink"
          >
            <Navlink
              text="Contact"
              href="/contact"
              enabled={false}
              isExpanded={titleExpanded}
            />
          </motion.div>
        </div>
      )}
      <Container maxW="none" minH="300px" align="center">
        <motion.div
          initial={{ y: "10%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <Stack spacing={10} align="center">
            <h1 className={styles.sayHello}>Say Hello!</h1>
            <Box
              as="button"
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
              maxW="none"
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(0, 0, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
            >
              SEND MESSAGE
            </Box>

            <HStack spacing={5}>
              <div className={styles.socialIcon}>
                <a
                  target="_blank"
                  href="https://www.facebook.com/arshsekhon.dev"
                >
                  <img src="/assets/socials/fb.svg" alt="facebook_icon" />
                </a>
              </div>
              <div className={styles.socialIcon}>
                <a
                  target="_blank"
                  href="https://www.behance.net/arshsekhonea7f"
                >
                  <img src="/assets/socials/Be.svg" alt="behance_icon" />
                </a>
              </div>
              <div className={styles.socialIcon}>
                <a target="_blank" href="https://twitter.com/sekhon_arsh_">
                  <img src="/assets/socials/twitter.svg" alt="twitter_icon" />
                </a>
              </div>
              <div className={styles.socialIcon}>
                <a
                  target="_blank"
                  href="https://www.instagram.com/sincerely_arsh/"
                >
                  <img src="/assets/socials/insta.svg" alt="insta_icon" />
                </a>
              </div>
            </HStack>
          </Stack>
        </motion.div>
      </Container>
    </>
  );
}
