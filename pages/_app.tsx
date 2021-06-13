import { AppProps } from "next/app";
import { AnimateSharedLayout } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import { AppContextProvider } from "../src/providers/AppContext";
import MainLayout from "../src/components/layouts/Main.Layout";
import Head from "next/head";
import { Router } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; //styles of nprogress

NProgress.configure({ showSpinner: true });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

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
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
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
