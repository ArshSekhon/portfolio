import {
  Input,
  Textarea,
  Heading,
  Stack,
  Button,
  HStack,
  Progress,
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

  const [stepIndex, setStepIndex] = React.useState(0);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sendingMessage, setSendingMessage] = React.useState(false);

  const [error, setError] = React.useState("");
  const [errorStep, setErrorStep] = React.useState(0);
  const [captchaHumanKey, setCaptchaHumanKey] = React.useState();
  const [touched, setTouched] = React.useState(false);
  const [sendError, setSendError] = React.useState("");

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
      setSendError("Failed to send message. Please consider contacting directly by sending an email to arshsekhon1998@gmail.com.");
      return;
    }

    setStepIndex(3);
  };
  const verifyCaptcha = (key) => {
    setCaptchaHumanKey(key);
  };
  const expireCaptcha = () => {
    setCaptchaHumanKey(null);
  };

  const ErrorBanner = () => {
    if (!touched) return null;
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
    setTouched(true);
    if (errorStep === stepIndex) return;
    if (stepIndex == 2) {
      await sendMessage();
      return; // sendMessage handles step advancement
    }
    setTouched(false);
    setStepIndex((i) => i + 1);
  };

  return (
    <div id="compose-message">
      <form id="message-form" onSubmit={(e) => e.preventDefault()}>
        <div id="questions-wrapper" style={{ marginBottom: "5vh" }}>
          <AnimatePresence mode="wait">
            {stepIndex === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: "5vh" }}
                animate={{ opacity: 1, y: "0vh" }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <Stack gap={8}>
                  <label htmlFor="name-input">
                    <Heading
                      textAlign="left"
                      fontFamily="Open Sans"
                      className={styles.label}
                    >
                      What's your name?
                    </Heading>
                  </label>
                  <Input
                    type="text"
                    name="Name"
                    borderRadius="0"
                    autoComplete="off"
                    className={styles.input}
                    id="name-input"
                    height="auto"
                    background="#e8e8e8"
                    color="rgba(0,0,0,.52)"
                    _focus={{ borderColor: "#c2c2c2" }}
                    value={name}
                    onChange={(e) => {
                      setTouched(true);
                      setName(e.target.value);
                    }}
                  />
                  <ErrorBanner />
                </Stack>
              </motion.div>
            )}

            {stepIndex === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: "5vh" }}
                animate={{ opacity: 1, y: "0vh" }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <Stack gap={8}>
                  <label htmlFor="email-input">
                    <Heading
                      textAlign="left"
                      fontFamily="Open Sans"
                      className={styles.label}
                    >
                      What's your email?
                    </Heading>
                  </label>
                  <Input
                    type="email"
                    name="Email"
                    borderRadius="0"
                    autoComplete="off"
                    className={styles.input}
                    id="email-input"
                    background="#e8e8e8"
                    height="auto"
                    color="rgba(0,0,0,.52)"
                    _focus={{ borderColor: "#c2c2c2" }}
                    value={email}
                    onChange={(e) => {
                      setTouched(true);
                      setEmail(e.target.value);
                    }}
                  />
                  <ErrorBanner />
                </Stack>
              </motion.div>
            )}

            {stepIndex === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: "5vh" }}
                animate={{ opacity: 1, y: "0vh" }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <Stack gap={8}>
                  <label htmlFor="message-input">
                    <Heading
                      textAlign="left"
                      fontFamily="Open Sans"
                      className={styles.label}
                    >
                      What's your message?
                    </Heading>
                  </label>

                  <Textarea
                    rows={5}
                    name="Message"
                    borderRadius="0"
                    autoComplete="off"
                    className={styles.input + " " + styles.textArea}
                    id="message-input"
                    background="#e8e8e8"
                    height="auto"
                    color="rgba(0,0,0,.52)"
                    _focus={{ borderColor: "#c2c2c2" }}
                    value={message}
                    onChange={(e) => {
                      setTouched(true);
                      setMessage(e.target.value);
                    }}
                  ></Textarea>
                  <ErrorBanner />
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={verifyCaptcha}
                    onExpired={expireCaptcha}
                  />
                  {sendError && (
                    <div style={{ color: "maroon", textAlign: "left", marginTop: "0.5em" }}>
                      {sendError}
                    </div>
                  )}
                  {sendingMessage && (
                    <Progress.Root value={null} size="xs">
                      {/* @ts-expect-error Chakra v3 Progress compound component types */}
                      <Progress.Track>
                        <Progress.Range />
                      </Progress.Track>
                    </Progress.Root>
                  )}
                </Stack>
              </motion.div>
            )}

            {stepIndex === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: "5vh" }}
                animate={{ opacity: 1, y: "0vh" }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
              >
                <Heading
                  size="4xl"
                  textAlign="left"
                  fontFamily="Open Sans"
                >
                  Thanks, I will be in touch!
                </Heading>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {stepIndex < 3 && (
          <div
            style={{
              fontFamily: "'Open Sans'",
              fontSize: "0.75rem",
              color: "#999",
              letterSpacing: "0.2em",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {stepIndex + 1} / 3
          </div>
        )}
        <HStack w="100%" justify="center" gap={5}>
          <Button
            onClick={onBackClick}
            size="lg"
            css={{
              background: "#fff",
              color: "#000",
              border: "2px solid #000",
              fontWeight: "400",
              borderRadius: "0",
              cursor: "pointer",
              "&:hover": { background: "#f5f5f5" },
            }}
          >
            {stepIndex === 3 ? "TAKE ME HOME" : "BACK"}
          </Button>
          {stepIndex < 3 && (
            <Button
              disabled={
                errorStep === stepIndex ||
                (stepIndex == 2 && (!captchaHumanKey || sendingMessage))
              }
              onClick={onNextClick}
              size="lg"
              css={{
                background: "#000",
                color: "#fff",
                fontWeight: "400",
                borderRadius: "0",
                cursor: "pointer",
                "&:hover": { background: "#222" },
                "&:disabled": {
                  background: "#999",
                  color: "#666",
                  cursor: "not-allowed",
                  opacity: 0.6,
                },
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
