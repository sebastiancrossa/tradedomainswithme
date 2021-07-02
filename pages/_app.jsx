import Head from "next/head";
import { Provider } from "next-auth/client";
import Router from "next/router";
import NProgress from "nprogress";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/global";
import GALayout from "../components/layout/GALayout";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />

        <meta
          property="og:image"
          content="https://res.cloudinary.com/kisana/image/upload/v1619462650/tradedomainswithme-pic.jpg"
        />
        <meta
          itemProp="image"
          content="https://res.cloudinary.com/kisana/image/upload/v1619462650/tradedomainswithme-pic.jpg"
        />
      </Head>
      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <GlobalStyles />
          <Toaster />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
