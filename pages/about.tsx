import React from "react";
import { motion } from "framer-motion";
import Navlink from "../src/components/navigation/Navlink/Navlink";
import { Router } from "next/router";
import useWindowSize from "../src/hooks/useWindowSize";
import { Container, Stack } from "@chakra-ui/react";
import styles from "./styles/about.module.css";
import { useAppContext } from "../src/providers/AppContext";

export default function AboutPage() {
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
  }, []);

  Router.events.on("beforeHistoryChange", (route: string) => {
    setOpen(false);
  });

  const [width, height] = useWindowSize();

  return (
    <>
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
        transition={{ delay: appCtx.data.introViewed ? 1.3 : 0, duration: 1 }}
      >
        <Container maxW="container.lg" marginTop="10vh">
          <Stack spacing={3} alignItems="flex-start">
            <div id="hello-about">
              <div className={styles.helloAbout}>Hello,</div>
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              bibendum ligula vitae leo bibendum porttitor. Nullam suscipit quam
              et diam blandit, non eleifend arcu pretium. Nam rhoncus tortor
              nibh, sit amet cursus metus hendrerit sed. Sed et ante sit amet
              purus rutrum elementum. Vestibulum euismod nec augue nec auctor.
              Donec a varius metus. Curabitur sit amet leo neque. Suspendisse
              porta turpis vel pretium fringilla. Quisque lobortis ut nibh in
              venenatis. Sed tincidunt blandit urna quis fermentum. Ut imperdiet
              neque est, ac posuere tellus semper vitae. Quisque mollis purus in
              pulvinar auctor. Aenean et semper purus. Nulla vulputate mollis
              feugiat. Aenean ut lobortis risus. Morbi tristique est eu lobortis
              mattis. Suspendisse luctus faucibus enim id feugiat. Praesent
              scelerisque elementum lacinia. Mauris eget ultrices nunc, sit amet
              dapibus ligula. Nullam aliquet ante ut ipsum condimentum bibendum.
              Phasellus imperdiet finibus tellus id dictum. Quisque tincidunt
              dolor eu justo cursus blandit. Pellentesque mollis mauris et augue
              semper, a ultrices eros iaculis. Vestibulum rhoncus vulputate
              metus, vel convallis ipsum laoreet at. Mauris facilisis
              scelerisque euismod. Praesent tristique, es
            </div>

            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              bibendum ligula vitae leo bibendum porttitor. Nullam suscipit quam
              et diam blandit, non eleifend arcu pretium. Nam rhoncus tortor
              nibh, sit amet cursus metus hendrerit sed. Sed et ante sit amet
              purus rutrum elementum. Vestibulum euismod nec augue nec auctor.
              Donec a varius metus. Curabitur sit amet leo neque. Suspendisse
              porta turpis vel pretium fringilla. Quisque lobortis ut nibh in
              venenatis. Sed tincidunt blandit urna quis fermentum. Ut imperdiet
              neque est, ac posuere tellus semper vitae. Quisque mollis purus in
              pulvinar auctor. Aenean et semper purus. Nulla vulputate mollis
              feugiat. Aenean ut lobortis risus. Morbi tristique est eu lobortis
              mattis. Suspendisse luctus faucibus enim id feugiat. Praesent
              scelerisque elementum lacinia. Mauris eget ultrices nunc, sit amet
              dapibus ligula. Nullam aliquet ante ut ipsum condimentum bibendum.
              Phasellus imperdiet finibus tellus id dictum. Quisque tincidunt
              dolor eu justo cursus blandit. Pellentesque mollis mauris et augue
              semper, a ultrices eros iaculis. Vestibulum rhoncus vulputate
              metus, vel convallis ipsum laoreet at. Mauris facilisis
              scelerisque euismod. Praesent tristique, es
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              bibendum ligula vitae leo bibendum porttitor. Nullam suscipit quam
              et diam blandit, non eleifend arcu pretium. Nam rhoncus tortor
              nibh, sit amet cursus metus hendrerit sed. Sed et ante sit amet
              purus rutrum elementum. Vestibulum euismod nec augue nec auctor.
              Donec a varius metus. Curabitur sit amet leo neque. Suspendisse
              porta turpis vel pretium fringilla. Quisque lobortis ut nibh in
              venenatis. Sed tincidunt blandit urna quis fermentum. Ut imperdiet
              neque est, ac posuere tellus semper vitae. Quisque mollis purus in
              pulvinar auctor. Aenean et semper purus. Nulla vulputate mollis
              feugiat. Aenean ut lobortis risus. Morbi tristique est eu lobortis
              mattis. Suspendisse luctus faucibus enim id feugiat. Praesent
              scelerisque elementum lacinia. Mauris eget ultrices nunc, sit amet
              dapibus ligula. Nullam aliquet ante ut ipsum condimentum bibendum.
              Phasellus imperdiet finibus tellus id dictum. Quisque tincidunt
              dolor eu justo cursus blandit. Pellentesque mollis mauris et augue
              semper, a ultrices eros iaculis. Vestibulum rhoncus vulputate
              metus, vel convallis ipsum laoreet at. Mauris facilisis
              scelerisque euismod. Praesent tristique, es
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              bibendum ligula vitae leo bibendum porttitor. Nullam suscipit quam
              et diam blandit, non eleifend arcu pretium. Nam rhoncus tortor
              nibh, sit amet cursus metus hendrerit sed. Sed et ante sit amet
              purus rutrum elementum. Vestibulum euismod nec augue nec auctor.
              Donec a varius metus. Curabitur sit amet leo neque. Suspendisse
              porta turpis vel pretium fringilla. Quisque lobortis ut nibh in
              venenatis. Sed tincidunt blandit urna quis fermentum. Ut imperdiet
              neque est, ac posuere tellus semper vitae. Quisque mollis purus in
              pulvinar auctor. Aenean et semper purus. Nulla vulputate mollis
              feugiat. Aenean ut lobortis risus. Morbi tristique est eu lobortis
              mattis. Suspendisse luctus faucibus enim id feugiat. Praesent
              scelerisque elementum lacinia. Mauris eget ultrices nunc, sit amet
              dapibus ligula. Nullam aliquet ante ut ipsum condimentum bibendum.
              Phasellus imperdiet finibus tellus id dictum. Quisque tincidunt
              dolor eu justo cursus blandit. Pellentesque mollis mauris et augue
              semper, a ultrices eros iaculis. Vestibulum rhoncus vulputate
              metus, vel convallis ipsum laoreet at. Mauris facilisis
              scelerisque euismod. Praesent tristique, es
            </div>
          </Stack>
        </Container>
      </motion.div>
    </>
  );
}
