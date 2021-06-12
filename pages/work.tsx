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

export default function Work() {
  const appCtx = useAppContext();
  const [Open, setOpen] = React.useState(true);
  const [titleExpanded, setTitleExpanded] = React.useState(
    !!appCtx.data.introViewed
  );

  React.useEffect(() => {
    setTimeout(() => {
      setTitleExpanded(false);
    }, 1100);
  }, []);

  Router.events.on("beforeHistoryChange", (route: string) => {
    setOpen(false);
  });

  const workFontSize =
    useBreakpointValue({ base: "2.5rem", md: "3rem" }) || "2.5rem";

  return (
    <>
      <Head>
        <title>Work - Arsh Sekhon</title>
      </Head>
      {Open && (
        <motion.div
          style={{
            position: "fixed",
            top: "50vh",
            right: "95vw",
            x: "50%",
            y: "-50%",
          }}
        >
          <motion.div transition={{ duration: 1 }} layoutId="work-HomeNavLink">
            <Navlink
              fontSize={workFontSize}
              text="Works"
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
          </motion.div>
        </motion.div>
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
            spacing={2}
            rowGap={20}
            columnGap={10}
            justify="space-evenly"
            alignContent="center"
            alignItems="center"
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          >
            <GridItem>
              <Stack textAlign="center" spacing={5}>
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
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      border="2px"
                      fontSize="1rem"
                      borderRadius="2px"
                      width="100%"
                      maxWidth="15em"
                      bg="#000"
                      borderColor="#000"
                      color="#fff"
                      _hover={{ bg: "#fff", color: "#000" }}
                      _active={{
                        borderColor: "#000",
                      }}
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(0, 0, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      Explore Projects
                    </Button>
                  </a>
                </div>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack textAlign="center" spacing={5} alignContent="center">
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
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      border="2px"
                      fontSize="1rem"
                      borderRadius="2px"
                      width="100%"
                      maxWidth="15em"
                      bg="#000"
                      borderColor="#000"
                      color="#fff"
                      _hover={{ bg: "#fff", color: "#000" }}
                      _active={{
                        borderColor: "#000",
                      }}
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(0, 0, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)",
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
