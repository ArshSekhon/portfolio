import { AppProps } from "next/app";
import { ChakraProvider, defaultSystem, Toaster } from "@chakra-ui/react";
import { toaster } from "../src/providers/toaster";
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
      <ChakraProvider value={defaultSystem}>
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
            href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
            rel="stylesheet"
          />

          <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
        {/* @ts-expect-error Chakra v3 Toaster type mismatch */}
        <Toaster toaster={toaster} />
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default App;
