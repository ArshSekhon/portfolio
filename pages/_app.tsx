import { AppProps } from "next/app";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
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

/**
 * App root — provider structure (outer to inner):
 * 1. AppContextProvider: holds introViewed state and navTransitionRect for morph animations
 * 2. ChakraProvider: UI component library theme
 * 3. MainLayout: shared page shell (container + footer)
 * 4. Component: the active page
 *
 * NProgress is configured globally for route-change loading indicators.
 */
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
      </ChakraProvider>
    </AppContextProvider>
  );
}

export default App;
