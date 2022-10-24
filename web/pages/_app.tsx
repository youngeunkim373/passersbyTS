import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../styles/theme";
//import { wrapper } from "../store";

import { GlobalStyle } from "../styles/GlobalStyle";

import Layout from "../components/templates/layout";

import "../styles/lightTheme.css";
import "../styles/font.css";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = (): void => {
    setDark((prev) => !prev);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>길 가는 사람들</title>
      </Head>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
          <Layout isDark={isDark} toggleDarkMode={toggleDarkMode}>
            <Component {...pageProps} />
          </Layout>
      </ThemeProvider>
    </>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
