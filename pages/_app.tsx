import { AppProps } from "next/app";
import { AnimateSharedLayout } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "../src/providers/AppContext";
import MainLayout from "../src/components/layouts/Main.Layout";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <AnimateSharedLayout>
        <ChakraProvider>
          <Head>
            <link
              href="https://fonts.googleapis.com/css?family=Open+Sans"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto"
              rel="stylesheet"
            />
            <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          </Head>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ChakraProvider>
      </AnimateSharedLayout>
    </AppContextProvider>
  );
}

export default App;
