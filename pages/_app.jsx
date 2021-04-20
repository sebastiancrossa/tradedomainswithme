import Head from "next/head";
import { Provider } from "next-auth/client";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "styled-components";
import theme from "../utils/theme";
import GlobalStyles from "../utils/global";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap"
          rel="stylesheet"
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
