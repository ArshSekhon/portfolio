import {
  Input,
  Textarea,
  Heading,
  Stack,
  Button,
  HStack,
  background,
  Progress,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default function ContactForm({ closeForm }) {
  const router = useRouter();
  const toast = useToast();

  const [stepIndex, setStepIndex] = React.useState(0);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sendingMessage, setSendingMessage] = React.useState(false);

  const [error, setError] = React.useState("");
  const [errorStep, setErrorStep] = React.useState(0);
  const [captchaHumanKey, setCaptchaHumanKey] = React.useState();

  const sendMessage = async () => {
    const payload = { name, email, message, captchaHumanKey };

    setSendingMessage(true);

    const response = await fetch("/api/sendMessage", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setSendingMessage(false);

    if (response.status !== 200) {
      const errorText =
        "Failed to send message. Please consider contacting directly by sending an email to arshsekhon1998@gmail.com.";
      toast({
        title: errorText,
        status: "error",
        isClosable: true,
      });
      console.error(errorText);
    }
    toast({
      title: "Message sent successfully!",
      status: "success",
      isClosable: true,
    });

    return;
  };
  const verifyCaptcha = (key) => {
    setCaptchaHumanKey(key);
  };
  const expireCaptcha = () => {
    setCaptchaHumanKey(null);
  };

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

  const onBackClick = () => {
    if (stepIndex < 1) closeForm();
    else if (stepIndex > 2) router.push("/");
    else setStepIndex((i) => i - 1);
  };

  const onNextClick = async () => {
    if (stepIndex == 2) await sendMessage();
    setStepIndex((i) => i + 1);
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
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  // render="explicit"
                  // onloadCallback={this.onCaptchaLoad}
                  onChange={verifyCaptcha}
                  onExpired={expireCaptcha}
                />
                {true && <Progress size="xs" isIndeterminate />}
              </Stack>
            </motion.div>
          )}

          {stepIndex === 3 && (
            <motion.div
              initial={{ opacity: 0, y: "5vh" }}
              animate={{ opacity: 1, y: "0vh" }}
              exit={{ opacity: 0, display: "none" }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
            >
              <Heading
                size="4xl"
                textAlign="left"
                fontFamily="Open Sans"
                as="label"
                htmlFor="message-input"
              >
                Thanks, I will be in touch!
              </Heading>
            </motion.div>
          )}
        </div>
        <HStack w="100%" justify="center" spacing={5}>
          <Button
            onClick={onBackClick}
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
              disabled={
                errorStep === stepIndex ||
                (stepIndex == 2 && !captchaHumanKey && !sendingMessage)
              }
              onClick={onNextClick}
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
