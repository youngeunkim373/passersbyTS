import { useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";
//import { wrapper } from "../store";

import "../styles/font.css";
import "react-quill/dist/quill.snow.css";
import { GlobalStyle } from "../styles/globalStyle";
import { lightTheme, darkTheme } from "../styles/theme";

import Layout from "../components/templates/layout";

function MyApp({ Component, pageProps }: AppProps) {
  const [isDark, setDark] = useState(false);

  const toggleDarkMode = (): void => {
    setDark((prev) => !prev);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="사람들의 의견이 궁금할 때 찾는 길 가는 사람들"
        />
        <title>길 가는 사람들</title>
      </Head>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <SessionProvider>
          <Layout isDark={isDark} toggleDarkMode={toggleDarkMode}>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}

// export default wrapper.withRedux(MyApp);
export default MyApp;
