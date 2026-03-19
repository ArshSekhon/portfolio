import React from "react";
import { Container, Button, Stack } from "@chakra-ui/react";
import styles from "./styles/404.module.css";
import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div>
      <Container
        maxW="md"
        overflow="hidden"
        justifyContent="center"
        justifyItems="center"
        textAlign="center"
      >
        <Stack gap={10}>
          <div
            className={styles.glitchWrapper}
            style={{ width: "100%", overflow: "hidden" }}
          >
            <div className={styles.glitchText}>
              <div className={styles.fourOFour}>404</div>
              Page Not Found
            </div>
          </div>
          <Button
            onClick={() => {
              router.push("/");
            }}
            css={{
              transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
              border: "2px solid #000",
              fontSize: "1rem",
              borderRadius: "2px",
              padding: "1em 5em",
              background: "#000",
              color: "#fff",
              cursor: "pointer",
              "&:hover": { background: "#fff", color: "#000" },
            }}
          >
            TAKE ME HOME
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
