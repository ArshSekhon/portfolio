import {
  Input,
  Textarea,
  Heading,
  Stack,
  Button,
  HStack,
  background,
} from "@chakra-ui/react";
import React from "react";
import styles from "./ContactForm.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ContactForm({ closeForm }) {
  const router = useRouter();

  const [stepIndex, setStepIndex] = React.useState(0);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorStep, setErrorStep] = React.useState(0);

  const ErrorBanner = () => {
    return <div style={{ textAlign: "left", color: "maroon" }}>{error}</div>;
  };

  const validateForm = () => {
    if (stepIndex === 0) {
      if (!name) {
        setError("Name is required.");
        setErrorStep(0);
        return;
      } else {
        if (error === "Name is required." && errorStep === 0) {
          setError("");
          setErrorStep(-1);
        }
      }
    } else if (stepIndex === 1) {
      if (!email) {
        setError("Email is required.");
        setErrorStep(1);
        return;
      } else {
        if (error === "Email is required." && errorStep === 1) {
          setError("");
          setErrorStep(-1);
        }
      }
      if (!validateEmail(email)) {
        setError("Email must be valid.");
        setErrorStep(1);
      } else {
        if (error === "Email must be valid." && errorStep === 1) {
          setError("");
          setErrorStep(-1);
        }
      }
    } else if (stepIndex === 2) {
      if (!message) {
        setError("Message is required.");
        setErrorStep(2);
        return;
      } else {
        if (error === "Message is required." && errorStep === 2) {
          setError("");
          setErrorStep(-1);
        }
      }
    }
  };

  React.useEffect(() => {
    validateForm();
  }, [stepIndex, name, email, message]);

  const goBack = () => {
    if (stepIndex < 1) closeForm();
    else if (stepIndex > 2) router.push("/");
    else setStepIndex((i) => i - 1);
  };

  return (
    <div id="compose-message">
      <form id="message-form" onSubmit={(e) => e.preventDefault()}>
        <div id="questions-wrapper" style={{ marginBottom: "5vh" }}>
          <AnimatePresence>
            {stepIndex === 0 && (
              <motion.div
                initial={{ opacity: 0, y: "5vh", display: "none" }}
                animate={{ opacity: 1, y: "0vh", display: "block" }}
                exit={{ opacity: 0, display: "none" }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <Stack spacing={5}>
                  <Heading
                    textAlign="left"
                    fontFamily="Open Sans"
                    as="label"
                    htmlFor="name-input"
                    className={styles.label}
                  >
                    What's your name?
                  </Heading>
                  <Input
                    type="text"
                    name="Name"
                    borderRadius="0"
                    autoComplete="false|off"
                    className={styles.input}
                    id="name-input"
                    focusBorderColor="#c2c2c2"
                    height="auto"
                    background="#e8e8e8"
                    color="rgba(0,0,0,.52)"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <ErrorBanner />
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {stepIndex === 1 && (
              <motion.div
                initial={{ opacity: 0, y: "5vh", display: "none" }}
                animate={{ opacity: 1, y: "0vh", display: "block" }}
                exit={{ opacity: 0, display: "none" }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                }}
              >
                <Stack spacing={5}>
                  <Heading
                    textAlign="left"
                    fontFamily="Open Sans"
                    as="label"
                    htmlFor="email-input"
                    className={styles.label}
                  >
                    What's your email?
                  </Heading>
                  <Input
                    type="email"
                    name="Email"
                    borderRadius="0"
                    autoComplete="false|off"
                    className={styles.input}
                    id="email-input"
                    focusBorderColor="#c2c2c2"
                    background="#e8e8e8"
                    height="auto"
                    color="rgba(0,0,0,.52)"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <ErrorBanner />
                </Stack>
              </motion.div>
            )}
          </AnimatePresence>

          {stepIndex === 2 && (
            <motion.div
              initial={{ opacity: 0, y: "5vh" }}
              animate={{ opacity: 1, y: "0vh" }}
              exit={{ opacity: 0, display: "none" }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <Stack spacing={5}>
                <Heading
                  textAlign="left"
                  fontFamily="Open Sans"
                  as="label"
                  htmlFor="message-input"
                  className={styles.label}
                >
                  What's your message?
                </Heading>

                <Textarea
                  rows={5}
                  name="Message"
                  borderRadius="0"
                  autoComplete="false|off"
                  className={styles.input + " " + styles.textArea}
                  id="message-input"
                  focusBorderColor="#c2c2c2"
                  background="#e8e8e8"
                  height="auto"
                  color="rgba(0,0,0,.52)"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                ></Textarea>
                <ErrorBanner />
              </Stack>
            </motion.div>
          )}

          {stepIndex === 3 && (
            <Heading
              size="4xl"
              textAlign="left"
              fontFamily="Open Sans"
              as="label"
              htmlFor="message-input"
            >
              Thanks, I will be in touch!
            </Heading>
          )}
        </div>
        <HStack w="100%" justify="center" spacing={5}>
          <Button
            onClick={goBack}
            background="#fff"
            border="2px solid #000"
            size="lg"
            fontWeight="400"
            borderRadius="0"
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(0, 0, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
          >
            {stepIndex === 3 ? "TAKE ME HOME" : "BACK"}
          </Button>
          {stepIndex < 3 && (
            <Button
              disabled={errorStep === stepIndex}
              onClick={() => {
                setStepIndex((i) => i + 1);
              }}
              colorScheme="teal"
              size="lg"
              background="black"
              _hover={{ background: "blackAlpha.900" }}
              fontWeight="400"
              borderRadius="0"
              _focus={{
                boxShadow:
                  "0 0 1px 2px rgba(0, 0, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)",
              }}
            >
              {stepIndex === 2 ? "SEND" : "NEXT"}
            </Button>
          )}
        </HStack>
      </form>
    </div>
  );
}
